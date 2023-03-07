from pydantic import BaseModel
from typing import Optional

class BirdCreate(BaseModel):
    name: str
    description: Optional[str]
    picture_url: Optional[str]

class BirdIn(BirdCreate):
    family: Optional[str]

class BirdOut(BirdIn):
    id: int

class Error(BaseModel):
    message: str
