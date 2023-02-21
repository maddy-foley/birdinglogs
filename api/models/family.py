from pydantic import BaseModel

class FamilyIn(BaseModel):
    family: str

class FamilyOut(FamilyIn):
    id: int
