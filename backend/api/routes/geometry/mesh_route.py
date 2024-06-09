from fastapi import APIRouter, Body
from ...services.geometry.geometry_service import *
from compas.geometry import (
    Vector as CVector,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

mesh_router = APIRouter(
    prefix="/geometry/mesh",
    tags=["geometry, mesh"],
    responses={404: {"description": "Not found"}},
)


@mesh_router.post(
    "/extrude-line",
)
def extrude_line_route(
    vector: Vector = Body(...),
    line: Line = Body(...),
):
    return extrude_line(line, vector)
