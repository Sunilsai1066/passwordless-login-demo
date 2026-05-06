from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import FRONTEND_ORIGIN
from app.routes.register import router as register_router
from app.routes.authenticate import router as authenticate_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        FRONTEND_ORIGIN
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(register_router)
app.include_router(authenticate_router)


@app.get("/")
async def root():
    return {
        "message": "Passwordless backend running"
    }