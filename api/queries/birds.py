from models.birds import BirdIn, BirdOut, Error, BirdCreate
from queries.db import pool


class BirdQueries:
    def get_all_birds(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, picture_url, description, family_id, account_id, id
                        FROM birds
                        ORDER BY id;
                        """
                    )
                    return [
                        self.record_to_bird_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def get_bird_by_id(self, bird_id: int) -> BirdOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, picture_url, description, family_id
                        FROM birds
                        WHERE id=%s;
                        """,
                        [bird_id]
                    )
                    record = result.fetchone()
                    return self.record_to_bird_out(record, bird_id)

        except Exception as e:
            return {"message": "Failed to get bird by id"}


    def create_bird(self, bird:BirdIn, account_id: int) -> BirdOut:

        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    family_result = cur.execute(
                        """
                        SELECT id
                        FROM families
                        WHERE family=%s;
                        """,
                        [bird.family]
                    )
                    family_id = family_result.fetchone()[0]
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO birds
                            (name, picture_url, description, family_id, account_id)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bird.name,
                            bird.picture_url,
                            bird.description,
                            family_id,
                            account_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return BirdOut(
                        id=id,
                        name=bird.name,
                        picture_url=bird.picture_url,
                        description=bird.description,
                        account_id=account_id,
                        family=bird.family
                    )
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def update_bird_by_id(self, bird_id: int, bird: BirdIn) -> BirdOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    family_result = cur.execute(
                        """
                        SELECT id
                        FROM families
                        WHERE family=%s;
                        """,
                        [bird.family]
                    )
                    family_id = family_result.fetchone()[0]
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE birds
                        SET name=%s, picture_url=%s, description=%s, family_id=%s
                        WHERE id=%s
                        RETURNING
                        name
                        , picture_url
                        , description
                        , family_id
                        id;
                        """,
                        [
                            bird.name,
                            bird.picture_url,
                            bird.description,
                            family_id,
                            bird_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_bird_out(record, bird_id)
        except Exception as e:
            return Error(message=str(e))


    def delete_bird_by_id(self, bird_id):
        try:
            deleted = self.get_bird_by_id(bird_id)
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM birds
                        WHERE id=%s
                        RETURNING name;
                        """
                        ,
                        [bird_id]
                    )
                    name = result.fetchone()[0]
                    if name == deleted.name:
                        return f"{name} deleted"
                    return {"message": "Failed to delete bird."}
        except Exception as e:
            return Error(message=str(e))



    def record_to_bird_out(self, record):
            return BirdOut(
                name=record[0],
                picture_url=record[1],
                description=record[2],
                family_id=record[3],
                account_id=record[4],
                id=record[5],
            )
            # else:
            #     return BirdOut(
            #         name=record[0],
            #         picture_url=record[1],
            #         description=record[2],
            #         family_id=record[3],
            #         account_id=None,
            #         id=record[4],
            #     )
