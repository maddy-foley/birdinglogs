from fastapi import APIRouter, Depends, Query
from typing import Union, Optional
from queries.birds import BirdOut, BirdQueries, BirdCreate, Error, BirdIn
from authenticator import authenticator

router = APIRouter()

@router.get('/api/birds')
def get_all_birds(
    repo: BirdQueries = Depends()
):
    return repo.get_all_birds()

## NEED TO TEST
@router.post('/api/birds')
def create_bird(
    bird: BirdIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: BirdQueries = Depends()
):
    if account_data:
        result = repo.create_bird(bird)
        return result
    else:
        return Error(message="You need an account to add birds")


@router.get('/api/birds/{bird_id}', response_model=Union[BirdOut, Error])
def get_bird_by_id(
    bird_id: int,
    repo: BirdQueries = Depends()
):
    return repo.get_bird_by_id(bird_id)


@ router.put('/api/birds/{bird_id}')
def update_bird_by_id(
    bird_id: int,
    bird: BirdIn,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: BirdQueries = Depends()
):
    if account_data:
        return repo.update_bird_by_id(bird_id, bird)
    else:
        return Error(message="You need an account to add birds")


@router.delete('/api/birds/{bird_id}')
def delete_bird_by_id(
    bird_id,
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
    repo: BirdQueries = Depends()
):
    if account_data:
        return repo.delete_bird_by_id(bird_id)
    else:
        return Error(message="You need an account to delete birds")
