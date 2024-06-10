from fastapi import APIRouter, Body
from ...services.geometry.surface_service import *
from compas.geometry import (
    Point as CPoint,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

surface_router = APIRouter(
    prefix="/geometry/point",
    tags=["geometry, point"],
    responses={404: {"description": "Not found"}},
)


# Create Point
@surface_router.post("/")
def read_root():
    return "Surface Router not implemented yet."
