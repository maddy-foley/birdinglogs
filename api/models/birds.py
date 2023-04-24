from pydantic import BaseModel
from typing import Optional

class BirdIn(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    family: Optional[str]

class BirdOut(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    family_id: int
    account_id: Optional[int]
    id: int


class JoinedBirdOut(BirdIn):
    username: str | None
    wish: int | None
    sightings: int
    id: int


class Error(BaseModel):
    message: str
