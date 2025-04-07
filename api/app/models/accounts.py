# from jwtdown_fastapi.authentication import Token
from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional

defaults = {
    'name': 'Name',
    'username': 'Username',
    'password': 'Password',
    'picture_url': 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Catbird_in_Central_Park_%2814585%29.jpg'
}

class Error(BaseModel):
    message: str


class AccountIn(BaseModel):
    name: str = defaults['name']
    username: str = defaults['username']
    password: str = defaults['password']
    picture_url: str = defaults['picture_url']
    disabled: bool


class AccountOut(BaseModel):
    id: int
    name: str = defaults['name']
    username: str = defaults['username']
    picture_url: str = defaults['picture_url']
    disabled: bool | None = None
    created_on: Optional[datetime]

class AccountOutWithPassword(BaseModel):
    id: int
    name: str
    username: str
    picture_url: str = defaults['picture_url']
    created_on: Optional[datetime]
    hashed_password: str


class AccountForm(BaseModel):
    username: str
    password: str


# class AccountToken(Token):
#     account: AccountOutWithPassword


class HttpError(BaseModel):
    detail: str


# class TokenResponse(BaseModel):
#     access_token: str
#     token_type: str
#     account: AccountOutWithPassword


class DuplicateAccountError(ValueError):
    pass
