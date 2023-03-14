from queries.db import pool
from models.accounts import (
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
    Error,
)
from typing import List
from common.common import timestamp


class AccountQueries:
    def get_account_by_username(self, username: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, password, id
                        FROM accounts
                        WHERE username=%s;
                        """,
                        [username]
                    )
                    record = result.fetchone()
                    if record is None:
                        return {"message": "Could not get account"}
                    return AccountOutWithPassword(
                        name = record[0],
                        username=record[1],
                        hashed_password=record[2],
                        id=record[3]
                    )
        except Exception as e:
            return Error(message=str(e))


    def get_account_by_id(self, account_id: int) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        SELECT name, username, picture_url, created_on, id
                        FROM accounts
                        WHERE id = %s;
                        """,
                        [account_id]
                    )
                    record = result.fetchone()
                    print("*****GET BY ID**********", record)
                    if record is None:
                        return {"message": "Could not get account"}
                    return self.record_to_account_out(record)
        except Exception as e:
            return Error(message=str(e))


    def create_account(self, account: AccountIn, hashed_password: str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        INSERT INTO accounts
                            (name, username, password, picture_url, created_on)
                        VALUES
                            (%s, %s, %s, %s, %s)
                        RETURNING id;
                        """,
                        [
                            account.name,
                            account.username,
                            hashed_password,
                            account.picture_url,
                            timestamp(),
                        ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(
                        id = id,
                        name = account.name,
                        username=account.username,
                        hashed_password=hashed_password,
                        picture_url=account.picture_url,
                        created_on=timestamp(),
                    )
        except Exception as e:
            print(e)
            return Error(message=str(e))


    def delete_account(self, account_id: int) -> bool:
        try:
            with pool.connection () as conn:
                with conn.cursor() as cur:
                    result = cur.execute(
                        """
                        DELETE FROM accounts
                        WHERE id=%s;
                        """,
                        [account_id]
                    )
                    return True if result is not None else False

        except Exception as e:
            return Error(message=str(e))

    def record_to_account_out(self, record):
        try:
            return AccountOut(
                name=record[0],
                username=record[1],
                picture_url=record[2],
                created_on=record[3],
                id=record[4]
            )
        except Exception as e:
            return Error(message=str(e))
