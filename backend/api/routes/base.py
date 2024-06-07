from fastapi import APIRouter, Body
from compas.geometry import Point as CompasPoint
from pydantic import BaseModel

class Point(BaseModel):
    x: float
    y: float
    z: float

router = APIRouter(
    prefix="/base",
    tags=["base"],
    responses={404: {"description": "Not found"}},
)  # Define a router object

@router.post("/point")  # Add your routes to the router object
def get_point(point: Point = Body(...)):
    print(point)
    # Create a CompasPoint object based on point.x, point.y, and point.z
    compas_point = CompasPoint(point.x, point.y, point.z)
    return {"point": compas_point.to_jsonstring()}