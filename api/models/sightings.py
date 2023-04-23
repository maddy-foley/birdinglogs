from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SightingIn(BaseModel):
    bird_id: int
    comment: str
    spotted_on: Optional[datetime | str]


class SightingOut(BaseModel):
    account_id: int
    bird_id: int
    comment: str
    spotted_on: Optional[datetime | str]
    id: int


class JoinedSightingOut(BaseModel):
    bird: str
    username: str
    picture_url: str
    family: str
    description: str
    comment: str
    spotted_on: Optional[datetime | str]
    bird_id: int
    id: int
