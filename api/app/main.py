from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import birds, accounts, sightings, wish, family, authentication
from birddata import load_birds


app = FastAPI()

router = APIRouter()

version_configurations = {
    "version": os.environ.get("VERSION"),
}

if version_configurations.get('version') == 'prod':
    version_configurations['origins'] = ["http://localhost:3000","http://localhost","https://birdinglogs.com"]
else:
    version_configurations['origins'] = [os.environ.get("CORS_HOST", "http://localhost:3000"),"http://localhost"]


app.add_middleware(
    CORSMiddleware,
    allow_origins=version_configurations.get('origins'),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(birds.router, tags=['Birds'])
app.include_router(accounts.router, tags=['Accounts'])
app.include_router(authentication.router, tags=['Login / Logout'])
app.include_router(sightings.router, tags=['Sightings'])
app.include_router(wish.router, tags=['Wish List'])
app.include_router(family.router, tags=['Family'])

if version_configurations.get('version') == 'dev':
    load_birds()
