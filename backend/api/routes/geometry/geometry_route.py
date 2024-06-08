from fastapi import APIRouter, Body
from ...services.geometry.geometry_service import *
import compas.geometry

router = APIRouter(
    prefix="/geometry",
    tags=["base"],
    responses={404: {"description": "Not found"}},
)  # Define a router object

@router.post("/create-point")  # Add your routes to the router object
def create_point_route(point: Coordinates = Body(...)):
    return create_point(point)

@router.post("/create-vector")
def create_vector_route(vector: Coordinates  = Body(...)):
    return create_vector(vector)

@router.post("/create-line-from-direction")
def create_line_from_direction_route(
    point: Coordinates = Body(...), 
    vector: Coordinates = Body(...), 
    length: float = Body(...), 
    name: Optional[str] = Body(None)
):
    return create_line_from_direction(point, vector, length, name)

@router.post("/create-line-from-direction")
def create_line_from_vector_route(
    point: Coordinates = Body(...), 
    vector: Coordinates = Body(...), 
    length: float = Body(...), 
    name: Optional[str] = Body(None)
):
    return create_line_from_vector(point, vector, name)

@router.post("/create-plane-from-three-points")
def create_plane_from_three_points_route(
    point1: Coordinates = Body(...), 
    point2: Coordinates = Body(...), 
    point3: Coordinates = Body(...), 
    name: Optional[str] = Body(None)
):
    return create_plane_from_three_points(point1, point2, point3, name)

@router.post("/create-plane-from-point-and-two-vectors")
def create_plane_from_point_and_two_vectors_route(
    point: Coordinates = Body(...), 
    vector1: Coordinates = Body(...), 
    vector2: Coordinates = Body(...), 
    name: Optional[str] = Body(None)
):
    return create_plane_from_point_and_two_vectors(point, vector1, vector2, name)