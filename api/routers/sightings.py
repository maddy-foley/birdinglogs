from fastapi import APIRouter, Depends, Query
from typing import Union, Optional
from authenticator import authenticator
from models.sightings import SightingIn, SightingOut
from queries.sightings import SightingsQueries



router = APIRouter()

@router.get('/api/sighting')
def get_all_sightings(
    repo: SightingsQueries = Depends()
):
    return repo.get_all_sightings()

@router.get('/api/sighting/me')
def get_all_sightings_by_account(
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.get_all_sightings_by_account(account_data['id'])
    else:
        return {"message": "could not get account data"}

@router.post('/api/sighting')
def create_sighting(
    bird: SightingIn,
    account_data: Optional[dict] = Depends(authenticator.try_get_current_account_data),
    repo: SightingsQueries = Depends()
):
    if account_data:
        return repo.create_sighting(bird, account_id=account_data['id'])
    else:
        return {"message": "could not get account data"}
