from fastapi import APIRouter

from ...utils.session import *

router = APIRouter()

@router.get("/{session_id}", tags=["session"])
async def session_vote(session_id: SessionId):
    session = await get_session(session_id)
    return {"session": session_id}


@router.get("/{session_id}/vote", tags=["session"])
async def session_vote(session_id: SessionId):
    return {"session": session_id}