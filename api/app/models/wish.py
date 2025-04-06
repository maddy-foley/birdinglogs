from pydantic import BaseModel

class WishOut(BaseModel):
    bird_id: int
    account_id: int
    id: int

class JoinedWishOut(BaseModel):
    name: str
    username: str
    id: int
    family: str
    picture_url: str
    wish: bool
    sightings: int
