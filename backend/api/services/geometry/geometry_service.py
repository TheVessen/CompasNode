from compas.geometry import (
    Point as CPoint,
    Vector as CVector,
    Line as CLine,
    Plane as CPlane,
)
from compas.datastructures import Mesh
from compas.geometry import NurbsCurve
from compas.geometry import NurbsSurface
from compas_occ.geometry import OCCNurbsSurface


from ...models.geometry.geometry_models import Coordinates, Point, Vector, Line
from typing import Optional, Dict


def create_plane_from_three_points(
    point1: Coordinates,
    point2: Coordinates,
    point3: Coordinates,
    name: Optional[str] = None,
):
    c_point1 = CPoint(point1.x, point1.y, point1.z)
    c_point2 = CPoint(point2.x, point2.y, point2.z)
    c_point3 = CPoint(point3.x, point3.y, point3.z)
    plane = CPlane.from_three_points(c_point1, c_point2, c_point3)
    return {plane.to_jsonstring()}


def create_plane_from_point_and_two_vectors(
    point: Coordinates,
    vector1: Coordinates,
    vector2: Coordinates,
    name: Optional[str] = None,
):
    c_point = CPoint(point.x, point.y, point.z)
    c_vector1 = CVector(vector1.x, vector1.y, vector1.z)
    c_vector2 = CVector(vector2.x, vector2.y, vector2.z)
    plane = CPlane.from_point_and_two_vectors(c_point, c_vector1, c_vector2)
    return {plane.to_jsonstring()}
