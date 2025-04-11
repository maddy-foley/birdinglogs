from datetime import datetime, timedelta, timezone
from typing import Annotated

# from routers.accounts import get_account_by_username
import jwt
from fastapi import Depends, HTTPException, status, APIRouter, Response, Request
from typing import Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from models.accounts import *
from queries.accounts import AccountQueries
from common.db import pool
import os

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
ACCESS_TOKEN_EXPIRE_MINUTES = 30

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)

def authenticate_account(
        username: str,
        password: str,
        repo: AccountQueries
        ):
    try:
        account = repo.get_account_by_username(username)
    except TypeError:
        return None
    if not account:
        return None
    if not verify_password(password, account.password):
        return None
    return account

async def get_current_account_from_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.env["SECRET_KEY"], algorithms=os.env["ALGORITHM"])
        username = payload.get("sub")

        if username is None:
            return None
        return username

    except Error:
        return None

async def get_current_account(
        current_account: Optional[AccountOut] = Depends(get_current_account_from_token),
        repo: AccountQueries = Depends()
        ):
    account_data = repo.get_account_by_username(current_account)
    return account_data



def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, os.env["SECRET_KEY"], algorithm=os.env["ALGORITHM"])

    return encoded_jwt


@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    repo: AccountQueries = Depends()
) -> Token:
    account = authenticate_account(form_data.username,form_data.password, repo)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": account.username},  expires_delta=access_token_expires)

    return Token(access_token=access_token, token_type="bearer")
