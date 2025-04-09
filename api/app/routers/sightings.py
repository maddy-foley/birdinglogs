from fastapi import APIRouter, Depends, Query
from typing import Union, Optional
from models.sightings import SightingIn, SightingOut
from queries.sightings import SightingsQueries
from routers.authentication import get_current_account
from models.accounts import TokenData





router = APIRouter()


@router.get('/api/sighting')
def get_all_sightings(
    repo: SightingsQueries = Depends()
):
    return repo.get_all_sightings()


@router.get('/api/sighting/me')
def get_all_sightings_by_account(
    account_data: TokenData = Depends(get_current_account),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.get_all_sightings_by_account(account_data.id)
    else:
        return {"message": "could not get account data"}


@router.post('/api/sighting')
def create_sighting(
    bird: SightingIn,
    account_data: TokenData = Depends(get_current_account),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.create_sighting(bird, account_id=account_data.id)
    else:
        return {"message": "could not get account data"}



@router.put('/api/sighting/{sighting_id}')
def update_sighting(
    sighting:SightingIn,
    sighting_id: int,
    account_data: TokenData = Depends(get_current_account),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.update_sighting(sighting, sighting_id, account_id=account_data.id)
    else:
        return {"message": "could not get account data"}

@router.delete('/api/sighting/{sighting_id}')
def delete_sighting(
    sighting_id,
    account_data: Optional[dict] = Depends(),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.delete_sighting(sighting_id, account_id=account_data.id)
    else:
        return {"message": "could not get account data"}


@router.get('/api/birds/{bird_id}/sightings')
def get_sighting_by_bird_id(
    bird_id,
    repo: SightingsQueries = Depends()
):
    return repo.get_sighting_by_bird_id(bird_id)


@router.get('/api/birds/{bird_id}/sightings/count', response_model=int)
def get_sighting_count_by_bird_id(
    bird_id,
    repo: SightingsQueries = Depends()
):
    return repo.get_sighting_count_by_bird_id(bird_id)
