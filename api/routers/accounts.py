from fastapi import (
    APIRouter,
    Depends,
    Request,
    Response,
    HTTPException,
    status
)

from queries.accounts import AccountQueries
from models.accounts import (
    AccountIn,
    AccountForm,
    AccountOut,
    AccountOutWithPassword,
    AccountToken,
    DuplicateAccountError,
    Error,
    TokenResponse,
    HttpError
)
from typing import List, Union, Optional
from authenticator import authenticator


router = APIRouter()


@router.get('/api/account/me', response_model=Union[AccountOut,Error])
def get_account_by_id(
    repo: AccountQueries = Depends(),
    account_data: Optional[dict] = Depends(authenticator.get_current_account_data),
):
    if account_data:
        return repo.get_account_by_id(account_data['id'])
    return {"message": "You are not logged in"}

@router.get('/api/account/username', response_model=Union[TokenResponse, Error])
def get_account_by_username(
    username:str,
    repo: AccountQueries = Depends()
):
    try:
        return repo.get_account_by_username(username)
    except Exception as e:
        return Error(message=str(e))


@router.get('/token', response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: AccountIn = Depends(authenticator.try_get_current_account_data)
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post('/api/account')
async def create_account(
    account: AccountIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends()
):
    hashed_password = authenticator.hash_password(account.password)

    try:
        result = repo.create_account(account, hashed_password)
    except DuplicateAccountError:
         raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials"
        )
    form = AccountForm(username=account.username, password=account.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=result, **token.dict())
