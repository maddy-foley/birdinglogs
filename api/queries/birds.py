from models.birds import BirdIn, BirdOut, Error, JoinedBirdOut
from queries.db import pool


class BirdQueries:
    def get_all_birds(self):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT b.name AS name
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , b.id AS id
                        FROM birds b
                        INNER JOIN families f
                            ON(f.id=b.family_id)
                        LEFT JOIN accounts a
                            ON(a.id=b.account_id)
                        """
                    )

                    return [
                        self.record_to_joined_bird_out(record)
                        for record in result
                    ]
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def get_birds_by_account(self, account_id: int):
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT b.name AS name
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , b.id AS id
                        FROM birds b
                        INNER JOIN families f
                            ON(f.id=b.family_id)
                        INNER JOIN accounts a
                            ON(a.id=b.account_id)
                        WHERE account_id=%s
                        """,
                        [account_id]
                    )

                    return [
                        self.record_to_joined_bird_out(record)
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
                        SELECT b.name AS name
                            , b.picture_url AS picture_url
                            , b.description AS description
                            , f.family AS family
                            , a.username AS username
                            , b.id AS id
                        FROM birds b
                        INNER JOIN families f
                            ON(f.id=b.family_id)
                        LEFT JOIN accounts a
                            ON(a.id=b.account_id)
                        WHERE b.id=%s;
                        """,
                        [bird_id]
                    )
                    record = result.fetchone()
                    return self.record_to_joined_bird_out(record)

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
                        family_id=family_id
                    )
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def update_bird_by_id(self, bird_id: int, bird: BirdIn, account_id: int) -> BirdOut:
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
                        WHERE id=%s AND account_id=%s
                        RETURNING
                        name
                        , picture_url
                        , description
                        , family_id
                        , account_id
                        , id;
                        """,
                        [
                            bird.name,
                            bird.picture_url,
                            bird.description,
                            family_id,
                            bird_id,
                            account_id
                        ]
                    )
                    record = result.fetchone()
                    return BirdOut(
                        name=record[0],
                        picture_url=record[1],
                        description=record[2],
                        family_id=record[3],
                        account_id=record[4],
                        id=record[5],
                    )
        except Exception as e:
            return Error(message=str(e))


    def delete_bird_by_id(self, bird_id: int, account_id: int):
        try:
            deleted = self.get_bird_by_id(bird_id)
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM birds
                        WHERE id=%s AND account_id=%s
                        RETURNING name;
                        """
                        ,
                        [bird_id, account_id]
                    )
                    name = result.fetchone()[0]
                    if name == deleted.name:
                        return f"{name} deleted"
                    return {"message": "Failed to delete bird."}
        except Exception as e:
            return Error(message=str(e))


    def record_to_joined_bird_out(self, record):
        if len(record) == 6:
            return JoinedBirdOut(
                name=record[0],
                picture_url=record[1],
                description=record[2],
                family=record[3],
                username=record[4],
                id=record[5]
            )
        else:
            return JoinedBirdOut(
                name=record[0],
                picture_url=record[1],
                description=record[2],
                family=record[3],
                username=None,
                id=record[4]
            )
