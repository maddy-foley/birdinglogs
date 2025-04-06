from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, FastAPI, HTTPException, status, APIRouter, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from models.accounts import *
from routers.secret import *
from common.db import pool
from queries.accounts import *

# INPROGRESS


router = APIRouter()


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: str | None = None

class AccountInDB(AccountIn):
    hashed_password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_account(pool, username: str):
    if username in pool:
        account_dict = pool[username]
        return AccountInDB(**account_dict)


def authenticate_account(fake_db, username: str, password: str):
    account = get_account(fake_db, username)
    if not account:
        return False
    if not verify_password(password, account.hashed_password):
        return False
    return account


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


async def get_current_account(token: Annotated[str, Depends(oauth2_scheme)]):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except InvalidTokenError:
        raise credentials_exception
    account = get_account(fake_accounts_db, username=token_data.username)
    if account is None:
        raise credentials_exception
    return account


async def get_current_active_account(
    current_account: Annotated[AccountOut, Depends(get_current_account)],
):
    if current_account.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_account


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    account = authenticate_account(pool, form_data.username, form_data.password)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": account.username}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token, token_type="bearer")


@router.get("/account/me/", response_model=AccountOut)
async def read_users_me(
    current_account: Annotated[AccountOut, Depends(get_current_active_account)],
):
    return current_account


@router.get("/account/me/items/")
async def read_own_items(
    current_account: Annotated[AccountOut, Depends(get_current_active_account)],
):
    return [{"item_id": "Foo", "owner": current_account.username}]

# from fastapi import (
#     APIRouter,
#     Depends,
#     Request,
#     Response,
#     HTTPException,
#     status
# )

# from queries.accounts import AccountQueries
# from models.accounts import (
#     AccountIn,
#     AccountForm,
#     AccountOut,
#     AccountOutWithPassword,
#     AccountToken,
#     DuplicateAccountError,
#     Error,
#     TokenResponse,
#     HttpError
# )
# from typing import List, Union, Optional
# from authenticator import authenticator


# router = APIRouter()


# @router.get('/api/account/me', response_model=Union[AccountOut,Error])
# def get_account_by_id(
#     repo: AccountQueries = Depends(),
#     account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
# ):
#     if account_data:
#         return repo.get_account_by_id(account_data['id'])
#     return {"message": "You are not logged in"}

# @router.get('/api/account/username', response_model=Union[TokenResponse, Error])
# def get_account_by_username(
#     username:str,
#     repo: AccountQueries = Depends()
# ):
#     try:
#         return repo.get_account_by_username(username)
#     except Exception as e:
#         return Error(message=str(e))


# @router.get('/token', response_model=AccountToken | None)
# async def get_token(
#     request: Request,
#     account: AccountIn = Depends(authenticator.try_get_current_account_data)
# ) -> AccountToken | None:
#     if account and authenticator.cookie_name in request.cookies:
#         return {
#             "access_token": request.cookies[authenticator.cookie_name],
#             "type": "Bearer",
#             "account": account,
#         }


@router.post('/api/account/create')
async def create_account(
    account: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends()
):
    hashed_password = pwd_context.hash(account.password)
    try:
        result = repo.create_account(account, hashed_password)
    except DuplicateAccountError:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )
    login_status = await login_for_access_token(pool,account.username,account.password)
    return login_status
