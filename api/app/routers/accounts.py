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
from queries.accounts import AccountQueries

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
    account = get_account_by_username(username=username)
    print("**** AUTH_ACCOUNT", account ,"*********")
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
    account = get_account_by_username(token_data.username)
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
    account = await authenticate_account(form_data.username, form_data.password)
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


def get_account_by_username(
    username:str,
    repo: AccountQueries = Depends()
):
    try:
        return repo.get_account_by_username(username)
    except Exception as e:
        return Error(message=str(e))


# FIX ERROR HANDLING
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

    return result
