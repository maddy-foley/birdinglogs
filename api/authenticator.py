import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models.accounts_model import AccountOut, AccountOutWithPassword


class AccountAuthenticator(Authenticator):
    async def get_account_data(
            self,
            username: str,
            repo: AccountQueries,
    ):
        return repo.get_account_by_username(username)

    def get_account_getter(
        self,
        account: AccountQueries = Depends(),
    ):
        return account

    def get_hashed_password(self, account: AccountOutWithPassword):
        print("****************** HASH PASS**********", account)
        return account.hashed_password

    def get_account_data_for_cookie(self, account: AccountOut):
        return account.username, AccountOutWithPassword(**account.dict())

authenticator = AccountAuthenticator(os.environ["SIGNING_KEY"])
