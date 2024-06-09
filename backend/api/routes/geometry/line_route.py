from fastapi import APIRouter, Body
from ...services.geometry.geometry_service import *
from compas.geometry import (
    Line as CLine,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

line_router = APIRouter(
    prefix="/geometry/line",
    tags=["geometry, line"],
    responses={404: {"description": "Not found"}},
)


@line_router.post("/create-from-points")
def create_line_from_points_route(
    point1: Point = Body(...),
    point2: Point = Body(...),
    name: Optional[str] = Body(None),
):
    return create_line_from_points(point1, point2, name)


@line_router.post("/create-from-direction")
def create_line_from_direction_route(
    point: Point = Body(...),
    direction: Vector = Body(...),
    length: float = Body(...),
):
    return create_line_from_direction(point, direction, length)
