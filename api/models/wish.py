from pydantic import BadeModel

class WishOut(BaseModel):
    bird_id: int
    account_id: int
    id: int
