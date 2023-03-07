from fastapi import APIRouter, Depends, Query
from typing import List, Union, Optional
from queries.birds import BirdOut, BirdQueries, BirdCreate, Error, BirdIn
from authenticator import authenticator
from data.family import family_choice


router = APIRouter()

@router.get('/api/birds')
def get_all_birds(
    repo: BirdQueries = Depends()
):
    return repo.get_all_birds()


@router.post('/api/birds')
def create_bird(
    bird: BirdCreate,
    family: str = Query("family", enum=family_choice),
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: BirdQueries = Depends()
):
    if account_data:
        result = repo.create_bird(bird, family)
        return result
    else:
        return Error(message="You need an account to add birds")


@router.get('/api/birds/{bird_id}', response_model=Union[BirdOut, Error])
def get_bird_by_id(
    bird_id: int,
    repo: BirdQueries = Depends()
):
    return repo.get_bird_by_id(bird_id)
