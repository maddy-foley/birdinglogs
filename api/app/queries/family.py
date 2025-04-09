from common.db import pool
from models.family import FamilyIn, FamilyOut


class FamilyQueries:
    def get_all_families(self):
        with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT family, id
                        FROM families
                        """
                    )
                    return [
                            self.record_to_family(record)
                            for record in result
                        ]
    def record_to_family(self, record):
        return FamilyOut(
             family=record[0],
             id=record[1]
        )
