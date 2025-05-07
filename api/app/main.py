from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import birds, accounts, sightings, wish, family, authentication
from migrations import up

app = FastAPI()

router = APIRouter()

version_configurations = {
    "version": os.environ.get("VERSION"),
}

if version_configurations.get('version') == 'prod':
    version_configurations['origins'] = ["http://localhost","http://localhost:3000","https://birdinglogs.com","https://www.birdinglogs.com"]
else:
    version_configurations['origins'] = [os.environ.get("CORS_HOST", "http://localhost:3000"),"http://localhost"]

@app.on_event("startup")
async def startup_event():
    await up(os.environ.get('DATABASE_URL'))

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
