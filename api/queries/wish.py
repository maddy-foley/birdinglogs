from queries.db import pool
from typing import List
from pydantic import BaseModel
from models.wish import WishOut



class WishQueries:
    def get_wishes(account_id: int) -> List[WishOut]:
        pass
    def create_wish(bird_id: int, account_id: int) -> WishOut:
        pass
    def delete_wish(bird_id: int, account_id:int):
        pass
