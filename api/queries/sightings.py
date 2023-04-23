from queries.db import pool
from models.sightings import SightingOut, SightingIn, JoinedSightingOut
from models.birds import Error
from typing import List


class SightingsQueries:
    def get_all_sightings(self) -> List[JoinedSightingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                          SELECT
                            b.name AS bird
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , s.comment as comment
                            , s.spotted_on as spotted_on
                            , s.id AS id
                        FROM sightings s
                        LEFT JOIN accounts a
                            ON(a.id = s.account_id)
                        INNER JOIN birds b
                            ON(b.id = s.bird_id)
                        INNER JOIN families f
                            ON(b.family_id = f.id)
                        ORDER BY spotted_on DESC;
                        """
                    )
                    return([
                        self.record_to_joined_sightings_out(record)
                        for record in result
                    ])

        except Exception as e:
            print(e)
            return {"message": "Failed to find sightings"}


    def get_all_sightings_by_account(self, account_id) -> List[JoinedSightingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT
                            b.name AS bird
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , s.comment as comment
                            , s.spotted_on as spotted_on
                            , s.bird_id AS bird_id
                            , s.id AS id
                        FROM sightings s
                        LEFT JOIN accounts a
                            ON(a.id = s.account_id)
                        INNER JOIN birds b
                            ON(b.id = s.bird_id)
                        INNER JOIN families f
                            ON(b.family_id = f.id)
                        WHERE s.account_id=%s
                        ORDER BY spotted_on DESC;
                        """,
                        [account_id]
                    )
                    return [
                            self.record_to_joined_sightings_out(record)
                            for record in result
                        ]

        except Exception as e:
            print(e)
            return {"message": "Failed to find sightings"}


    def create_sighting(self, sighting: SightingIn, account_id) -> SightingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO sightings
                            (bird_id, account_id, comment, spotted_on)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            sighting.bird_id,
                            account_id,
                            sighting.comment,
                            sighting.spotted_on,
                        ]
                    )
                    result = result.fetchone()
                    id = result[0]
                    return SightingOut(
                        id=id,
                        bird_id=sighting.bird_id,
                        account_id=account_id,
                        comment=sighting.comment,
                        spotted_on=sighting.spotted_on,
                    )


        except Exception as e:
            return Error(message=str(e))


    def update_sighting(self, sighting: SightingIn, sighting_id, account_id) -> SightingOut:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        UPDATE sightings
                        SET bird_id=%s, comment=%s, spotted_on=%s
                        WHERE id=%s AND account_id=%s
                        RETURNING
                            bird_id
                            , account_id
                            , comment
                            , spotted_on
                            , id;
                        """,
                        [
                            sighting.bird_id,
                            sighting.comment,
                            sighting.spotted_on,
                            sighting_id,
                            account_id
                        ]
                    )
                    record = result.fetchone()
                    return self.record_to_sightings_out(record)
        except Exception as e:
            print(e)
            return {"message" : "cannot find sighting"}

    def delete_sighting(self, sighting_id, account_id):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM sightings
                        WHERE id=%s AND account_id=%s
                        RETURNING comment;
                        """,
                        [
                            sighting_id,
                            account_id
                        ]
                    )
                    comment = result.fetchone()
                    if comment:
                        return True
                    else:
                        return {"message": "failed to delete sighting"}
        except Exception as e:
            print(e)
            return{"message":"Failed to find account or sighting"}

    def get_sighting_by_bird_id(self, bird_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                          SELECT
                            b.name AS bird
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , s.comment as comment
                            , s.spotted_on as spotted_on
                            , s.id AS id
                        FROM sightings s
                        LEFT JOIN accounts a
                            ON(a.id = s.account_id)
                        INNER JOIN birds b
                            ON(b.id = s.bird_id)
                        INNER JOIN families f
                            ON(b.family_id = f.id)
                        WHERE b.id=%s
                        ORDER BY spotted_on DESC;
                        """,
                        [bird_id]
                    )
                    return([
                        self.record_to_joined_sightings_out(record)
                        for record in result
                    ])

        except Exception as e:
            print(e)
            return {"message": "Failed to find sightings"}

    def get_sighting_count_by_bird_id(self, bird_id: int) -> int:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT COUNT(*) FROM sightings
                        WHERE bird_id=%s
                        """,
                        [bird_id]
                    )
                    return result.fetchone()[0]

        except Exception as e:
            print(e)
            return {"message": "Failed to find sightings"}

    def record_to_sightings_out(self, record):
        return SightingOut(
            bird_id=record[0],
            account_id=record[1],
            comment=record[2],
            spotted_on=str(record[3]),
            id=record[4],
        )


    def record_to_joined_sightings_out(self, record):
        return JoinedSightingOut(
            bird=record[0],
            picture_url=record[1],
            description=record[2],
            family=record[3],
            username=record[4],
            comment=record[5],
            spotted_on=str(record[6]),
            bird_id=record[7],
            id=record[8]
        )
