import redis.asyncio as redis
import json
from dataclasses import dataclass, asdict

import string
import random

SessionId = str
@dataclass
class Session:
    session_id: SessionId
    data: dict = None

    def __init__(self, session_id: SessionId, data: dict = None):
        self.session_id = session_id
        self.data = data or {}

    def to_json(self) -> str:
        return json.dumps(asdict(self))

    @classmethod
    def from_json(cls, json_str: str) -> "Session":
        obj = json.loads(json_str)
        return cls(session_id=obj["session_id"], data=obj.get("data", {}))

@dataclass
class UnknownSessionException(Exception):
    unknown_session_id: SessionId
    def __init__(
            self,
            session_id: SessionId
        ):
        self.unknown_session_id = session_id

class SessionProvider:
    def __init__(
        self,
        host: str = "localhost",
        port: int = 6379,
        db: int = 0,
        ttl: int = 3600,         # Session expiry in seconds (1 hour default)
        key_prefix: str = "session:",
    ):
        self.redis = redis.Redis(host=host, port=port, db=db, decode_responses=True,
                                 
                                 password="changeme")
        self.ttl = ttl
        self.key_prefix = key_prefix

    async def _generate_unused_session_id(self) -> SessionId:
        while(True):
            characters = string.ascii_letters + string.digits
            session_id = ''.join(random.choices(characters, k=10))
            key = self._make_key(session_id)
            raw = await self.redis.get(key)
            if(raw is None):
                return session_id


    def _make_key(self, session_id: SessionId) -> str:
        return f"{self.key_prefix}{session_id}"

    async def create_session(self) -> Session:
        session_id = await self._generate_unused_session_id()
        session = Session(session_id)
        key = self._make_key(session.session_id)
        await self.redis.set(key, session.to_json(), ex=self.ttl)
        return session

    async def get_session(self, session_id: SessionId) -> Session:
        """Fetch a session from Redis. Creates a new one if not found."""
        key = self._make_key(session_id)
        raw = await self.redis.get(key)

        if raw is None:
            raise UnknownSessionException(session_id)

        return Session.from_json(raw)

    async def update_session(self, session: Session) -> None:
        """Persist a session to Redis, resetting its TTL."""
        key = self._make_key(session.session_id)
        await self.redis.set(key, session.to_json(), ex=self.ttl)

    async def delete_session(self, session_id: SessionId) -> None:
        """Remove a session from Redis."""
        key = self._make_key(session_id)
        await self.redis.delete(key)

    async def close(self) -> None:
        """Close the Redis connection."""
        await self.redis.aclose()