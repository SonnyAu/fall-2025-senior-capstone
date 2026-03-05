from fastapi import APIRouter

from utils.session import *

router = APIRouter()

session_provider = SessionProvider()

@router.post("/create", tags=["session"])
async def session_create():
    session = await session_provider.create_session()
    return session

@router.get("/{session_id}", tags=["session"])
async def session_vote(session_id: SessionId):
    session = await session_provider.get_session(session_id)
    return session


@router.get("/{session_id}/vote", tags=["session"])
async def session_vote(session_id: SessionId):
    return {
        "session": session_id
    }