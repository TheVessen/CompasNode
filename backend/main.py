from typing import Union
from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from compas.geometry import Point
from pydantic import BaseModel
from backend.api.routes.base import router as base_router

app = FastAPI()

origins = [
    "*",  # Allow all origins
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(base_router)

@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
