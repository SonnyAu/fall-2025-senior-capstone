import uvicorn
from fastapi import FastAPI
from .routers.v0.session import router as V0Session

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}

app.include_router(prefix="/v0/session", router=V0Session)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)