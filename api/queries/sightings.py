from queries.db import pool
from models.sightings import SighingOut, SightingIn
from typing import List
from common.common import timestamp


class SightingsQueries:
    def get_all_sightings(self) -> List[SighingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT bird_id, account_id, comment, spotted_on
                        FROM sightings
                        ORDER BY spotted_on
                        """
                    )
                    return [
                        self.record_to_sightings_out(record)
                        for record in result
                    ]

        except Exception as e:
            return {"message": "Failed to find sightings"}


    def record_to_sightings_out(record):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    bird = cur.execute(
                        """
                        SELECT name
                        FROM birds
                        WHERE id = %s
                        """,
                        [bird_id]
                    )
        except Exception as e:
            return {"message": "could not get bird"}
