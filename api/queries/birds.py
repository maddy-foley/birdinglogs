import requests
from models.birds import BirdIn, BirdOut, Error
from queries.db import pool


class BirdQueries:
    def get_birds(self):
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

    def record_to_bird_out(self, record):
        try:
            return BirdOut(
                name=record[0],
                picture_url=record[1],
                description=record[2],
                family_id = record[3],
                id=record[4]
            )
        except Exception as e:
            print(e)
            return Error(message=str(e))
