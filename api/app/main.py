from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import birds, accounts, sightings, wish, family
from authenticator import authenticator
from birddata import load_birds



app = FastAPI()

router = APIRouter()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # for development:
        # os.environ.get("CORS_HOST", "http://localhost:3000")


        # for productiont:
        os.environ.get("CORS_HOST", "http://localhost")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(birds.router, tags=['Birds'])
app.include_router(accounts.router, tags=['Accounts'])
# app.include_router(authenticator.router, tags=['Login / Logout'])
app.include_router(sightings.router, tags=['Sightings'])
app.include_router(wish.router, tags=['Wish List'])
app.include_router(family.router, tags=['Family'])

load_birds()
