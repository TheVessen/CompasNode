from fastapi import APIRouter, Body
from ...services.geometry.surface_service import *
from compas.geometry import (
    Point as CPoint,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates, PolylineInput
from typing import List

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
    surface = extrude_line(line, vector)
    return convert_to_surface_response(surface)


@surface_router.post("/extrude_polyline")
def r_extrude_polyline(
    polyline: Polyline = Body(...), vector: Vector = Body(...)
) -> str:
    surface = extrude_polyline(polyline, vector)
    return convert_to_surface_response(surface)


@surface_router.post("/loft")
def r_loft(polylines: PolylineInput = Body(...)) -> str:
    polylines_List = polylines.polylines
    lofted_surface = loft(polylines.polylines)
    return "Test"
