from fastapi import APIRouter, Depends, Query
from typing import Union, Optional
from models.family import FamilyIn, FamilyOut
from queries.family import FamilyQueries


router = APIRouter()

@router.get('/api/family')
def get_all_sightings(
    repo: FamilyQueries = Depends()
):
    return repo.get_all_families()
