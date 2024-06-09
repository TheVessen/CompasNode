from fastapi import APIRouter, Body, HTTPException
from ...services.geometry.geometry_service import *
from compas.geometry import Point as CPoint, Plane as CPlane
from ...models.geometry.geometry_models import Point, Vector, Coordinates, Plane

point_router = APIRouter(
    prefix="/geometry/point",
    tags=["geometry, point"],
    responses={404: {"description": "Not found"}},
)


@point_router.post("/create")
def create(
    point: Coordinates = Body(..., description="The coordinates of the point.")
) -> str:
    return CPoint(point.x, point.y, point.z, point.name).to_jsonstring()


# @point_router.post("/")
# def project_on_plane(
#     point: Point = Body(..., description="The point to project."),
#     plane: Plane = Body(..., description="The plane to project the point on."),
# ) -> str:
#     c_point = point.to_compas()
#     c_Plane = CPlane()
