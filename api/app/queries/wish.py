from queries.db import pool
from typing import List
from pydantic import BaseModel
from models.wish import WishOut, JoinedWishOut



class WishQueries:
    def get_wishes(self, account_id: int) -> List[JoinedWishOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT b.picture_url AS picture_url
                            , f.family AS family
                            , b.name  AS name
                            , b.id AS bird_id
                            , a.username AS username
                            , CASE
                                WHEN COUNT(w.account_id) > 0
                                    THEN 1
                                    ELSE 0
                            END as wish
                            , COUNT(s.bird_id) AS sightings
                        FROM wishes AS w
                        INNER JOIN birds b
                            ON(b.id = w.bird_id)
                        INNER JOIN accounts a
                            ON(a.id = w.account_id)
                        INNER JOIN families f
                            ON(b.family_id = f.id)
                        LEFT JOIN sightings s
                            ON(s.bird_id=b.id)
                        WHERE w.account_id=%s
                        GROUP BY b.picture_url, b.id, b.name, a.username, f.family, w.id;

                        """,
                        [
                            account_id
                        ]
                    )
                    if result != None:
                        return [
                            self.record_to_joined_wish(record)
                            for record in result ]
                    else:
                        return {"message": "You have no birds on your wishlist"}
        except Exception as e:
            print(e)
            return {"message": "failed to get wishes"}

    def create_wish(self, bird_id: int, account_id: int) -> WishOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO wishes (bird_id, account_id)
                        VALUES ( %s, %s)
                        RETURNING bird_id, account_id, id;
                        """,
                        [
                            bird_id,
                            account_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_wish_out(record)

        except Exception as e:
            print(e)
            return {"message": "failed to add bird to your wishlist"}

    def delete_wish(self, bird_id: int, account_id:int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM wishes
                        WHERE bird_id=%s AND account_id=%s
                        """,
                        [
                            bird_id,
                            account_id
                        ]
                    )
                    if result is not None:
                        return True
                    return False
        except Exception as e:
            print(e)
            return {"message": "Failed to delete bird from wishlist"}

    def record_to_wish_out(self, record):
        return WishOut(
            bird_id=record[0],
            account_id=record[1],
            id=record[2]
        )
    def record_to_joined_wish(self, record):
        return JoinedWishOut(
            picture_url=record[0],
            family=record[1],
            name=record[2],
            id=record[3],
            username=record[4],
            wish=record[5],
            sightings=record[6]
        )
