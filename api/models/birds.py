from pydantic import BaseModel
from typing import Optional

class BirdCreate(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]

class BirdIn(BirdCreate):
    family: Optional[str]

class BirdOut(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]
    family_id: int
    account_id: Optional[int]
    id: int


class JoinedBirdOut(BirdIn):
    pass

class Error(BaseModel):
    message: str
