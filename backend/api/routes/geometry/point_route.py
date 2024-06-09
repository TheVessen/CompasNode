from fastapi import APIRouter, Body
from ...services.geometry.geometry_service import *
from compas.geometry import (
    Point as CPoint,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

point_router = APIRouter(
    prefix="/geometry/point",
    tags=["geometry, point"],
    responses={404: {"description": "Not found"}},
)


# Create Point
@point_router.post("/create")
def create(
    point: Coordinates = Body(..., description="The coordinates of the point.")
) -> str:
    return CPoint(point.x, point.y, point.z, point.name).to_jsonstring()
