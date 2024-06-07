from fastapi import APIRouter, Body
from compas.geometry import Point as CompasPoint
from .models import Point
from .geometry_service import create_point

router = APIRouter(
    prefix="/geometry",
    tags=["base"],
    responses={404: {"description": "Not found"}},
)  # Define a router object

@router.post("/create-point")  # Add your routes to the router object
def create_point_route(point: Point = Body(...)):
    return create_point(point)