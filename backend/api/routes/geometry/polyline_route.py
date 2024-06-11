from fastapi import APIRouter, Body
from ...services.geometry.polyline_service import *
from compas.geometry import (
    Line as CLine,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

polyline_router = APIRouter(
    prefix="/geometry/polyline",
    tags=["line"],
    responses={404: {"description": "Not found"}},
)


@polyline_router.post("/create")
def create_line_from_points_route(points: list[Point]):
    return create_polyline_from_points(points)
