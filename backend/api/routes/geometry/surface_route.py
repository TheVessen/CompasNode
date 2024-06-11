from fastapi import APIRouter, Body
from ...services.geometry.surface_service import *
from compas.geometry import (
    Point as CPoint,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

surface_router = APIRouter(
    prefix="/geometry/surface",
    tags=["point"],
    responses={404: {"description": "Not found"}},
)


# Create Point
@surface_router.post("/")
def read_root():
    return "Surface Router not implemented yet."


@surface_router.post("/extrude_line")
def r_extrude_line(line: Line = Body(...), vector: Vector = Body(...)) -> str:
    return extrude_line(line, vector)


@surface_router.post("/extrude_polyline")
def r_extrude_polyline(
    polyline: Polyline = Body(...), vector: Vector = Body(...)
) -> str:
    return extrude_polyline(polyline, vector)
