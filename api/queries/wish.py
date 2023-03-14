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
                        SELECT b.name AS name
                            , a.username AS username
                            , w.id AS id
                        FROM wishes AS w
                        INNER JOIN birds b
                            ON(b.id = w.bird_id)
                        INNER JOIN accounts a
                            ON(a.id = w.account_id)
                        WHERE account_id=%s;
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
            with

    def record_to_wish_out(self, record):
        return WishOut(
            bird_id=record[0],
            account_id=record[1],
            id=record[2]
        )
    def record_to_joined_wish(self, record):
        return JoinedWishOut(
            bird=record[0],
            username=record[1],
            id=record[2]
        )
