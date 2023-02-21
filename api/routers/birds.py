from fastapi import APIRouter, Depends
from typing import List, Union, Optional
from queries.birds import BirdOut, BirdQueries, Error

router = APIRouter()

@router.get('/api/birds')
def get_birds(
    repo: BirdQueries = Depends()
):
    return repo.get_birds()
