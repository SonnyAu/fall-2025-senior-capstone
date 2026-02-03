
SessionId = str

class Session:
    pass    

async def get_session(session_id: SessionId) -> Session:
    return Session()