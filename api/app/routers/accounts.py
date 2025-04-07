from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from fastapi import Depends, HTTPException, status, APIRouter, Response, Request
from typing import Union
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jwt.exceptions import InvalidTokenError
from passlib.context import CryptContext
from pydantic import BaseModel
from models.accounts import *
from routers.secret import *
from queries.accounts import AccountQueries
from common.db import pool

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


def authenticate_account(username: str, password: str):
    try:
        account = get_account_by_username(username)
    except TypeError:
        return None
    if not account:
        return None
    if not verify_password(password, account.password):
        return None
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

async def get_current_account(token: str = Depends(oauth2_scheme)):
    # credentials_exception = HTTPException(
    #     status_code=status.HTTP_401_UNAUTHORIZED,
    #     detail="Could not validate credentials",
    #     headers={"WWW-Authenticate": "Bearer"},
    # )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")

        if username is None:
            return None
        return username

    except Error:
        return None

@router.post("/token")
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    account = authenticate_account(form_data.username,form_data.password)
    if not account:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": account.username},  expires_delta=access_token_expires)
    return Token(access_token=access_token, token_type="bearer")


def get_account_by_username(
    username:str
):
    try:
        with pool.connection() as conn:
            with conn.cursor() as cur:
                result = cur.execute(
                    """
                    SELECT username, password, id
                    FROM accounts
                    WHERE username=%s;
                    """,
                    [username]
                )
                record = result.fetchone()
                if record is None:
                    return {"message": "Could not get account"}
                return AccountForm(
                    username = record[0],
                    password=record[1],
                    id=record[2]
                )
    except Exception as e:
        raise HTTPException(status_code=400, detail="Error fetching account")

async def get_current_active_account_strict(current_account: AccountOut = Depends(get_current_account)):

    if current_account is None:
        raise HTTPException(status_code=400, detail="Inactive account")
    account_data = get_account_by_username(current_account)
    return account_data

async def get_current_active_account(current_account: Optional[AccountOut] = Depends(get_current_account)):
    account_data = get_account_by_username(current_account)
    return account_data

# FIX ERROR HANDLING
@router.post('/api/account/create')
async def create_account(
    account: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends()
):
    hashed_password = get_password_hash(account.password)
    try:
        result = repo.create_account(account, hashed_password)
    except DuplicateAccountError:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )

    return result

@router.get("/api/users/me/")
async def read_accounts_me(
    current_account: TokenData = Depends(get_current_active_account),
):
    account_data = get_account_by_username(current_account)
    return account_data
