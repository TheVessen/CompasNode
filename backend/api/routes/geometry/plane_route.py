from fastapi import APIRouter, Body
from ...services.geometry.plane_service import *
from compas.geometry import (
    Vector as CVector,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

plane_router = APIRouter(
    prefix="/geometry/plane",
    tags=["plane"],
    responses={404: {"description": "Not found"}},
)
