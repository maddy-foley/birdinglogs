import requests
from models.birds import BirdIn, BirdOut, Error
from queries.db import pool


class BirdQueries:
    def get_all_birds(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, picture_url, description, family_id, id
                        FROM birds;
                        """
                    )
                    print(result.fetchone())
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
                    family_id = record[3]
                with pool.connection() as conn2:
                    with conn2.cursor() as curr2:
                        family_result = curr2.execute(
                            """
                            SELECT family
                            FROM families
                            WHERE id=%s;
                            """,
                            [family_id]
                        )
                        fam = family_result.fetchone()[0]
                    return BirdOut(
                        id=bird_id,
                        name=record[0],
                        picture_url=record[1],
                        description=record[2],
                        family=fam
                    )

        except Exception as e:
            return {"message": "Failed to get bird by id"}


    def create_bird(self, bird: BirdIn) -> BirdOut:
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
                            (name, picture_url, description, family_id)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            bird.name,
                            bird.picture_url,
                            bird.description,
                            family_id
                        ]
                    )
                    id = result.fetchone()[0]
                    return BirdOut(
                        id=id,
                        name=bird.name,
                        picture_url=bird.picture_url,
                        description=bird.description,
                        family=bird.family
                    )
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def record_to_bird_out(self, record):
        return BirdOut(
            name=record[0],
            picture_url=record[1],
            description=record[2],
            family_id=record[3],
            id=record[4]
        )
