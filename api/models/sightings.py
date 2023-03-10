from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SightingIn(BaseModel):
    account_id: int
    bird_id: int
    comments: str
    timestamp: Optional[datetime]


class SighingOut(BaseModel):
    username: str
    bird: str
    comments: str
    timestamp: Optional[datetime]
    id: int
