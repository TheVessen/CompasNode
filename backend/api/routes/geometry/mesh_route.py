from fastapi import APIRouter, Body
from ...services.geometry.mesh_service import *
from compas.geometry import (
    Vector as CVector,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

mesh_router = APIRouter(
    prefix="/geometry/mesh",
    tags=["geometry, mesh"],
    responses={404: {"description": "Not found"}},
)
