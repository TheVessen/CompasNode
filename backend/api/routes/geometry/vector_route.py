from fastapi import APIRouter, Body
from ...services.geometry.geometry_service import *
from compas.geometry import (
    Vector as CVector,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

vector_router = APIRouter(
    prefix="/geometry/vector",
    tags=["geometry, vector"],
    responses={404: {"description": "Not found"}},
)


# Create Vector
@vector_router.post(
    "/create",
    response_model=str,
    summary="Create a vector",
    description="This endpoint creates a vector from the given coordinates and returns a JSON object representing the vector.",
    response_description="A JSON object representing the vector.",
)
def create_vector_route(
    vector: Coordinates = Body(..., description="The coordinates of the vector.")
) -> str:
    return CVector(vector.x, vector.y, vector.z, vector.name).to_jsonstring()
