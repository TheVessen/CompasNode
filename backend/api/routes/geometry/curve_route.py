from fastapi import APIRouter, Body
from ...services.geometry.curve_service import *
from compas.geometry import (
    Curve as CCurve,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

curve_router = APIRouter(
    prefix="/geometry/curve",
    tags=["curve"],
    responses={404: {"description": "Not found"}},
)
