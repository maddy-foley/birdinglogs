from fastapi import APIRouter, Depends, Query
from typing import Union, Optional
from authenticator import authenticator
from models.wish import WishOut
from queries.wish import WishQueries


router = APIRouter()

@router.get('/api/account/me/wishes')
def get_wishes(
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: WishQueries = Depends()
):
    if account_data:
        return repo.get_wishes(account_id=account_data['id'])
    else:
        return {"message": "failed to get account"}


@router.post('/api/birds/{bird_id}/wishes')
def create_wish(
    bird_id: int,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: WishQueries = Depends()
):
    if account_data:
        return repo.create_wish(bird_id, account_id=account_data['id'])
    else:
        return {"message": "failed to get account"}
