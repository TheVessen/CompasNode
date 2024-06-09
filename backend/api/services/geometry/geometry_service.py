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


# Line creation service
def create_line_from_points(
    point1: Point, point2: Point, name: Optional[str] = None
) -> str:
    line = CLine(
        CPoint.__from_data__(point1.data), CPoint.__from_data__(point2.data), name
    )
    return line.to_jsonstring()


def create_line_from_direction(point: Point, vector: Vector, length: float) -> str:
    c_point = CPoint.__from_data__(point.data)
    c_vector = CVector.__from_data__(vector.data).unitized()
    line = CLine.from_point_direction_length(c_point, c_vector, length)
    return line.to_jsonstring()


# def create_line_from_vector(
#     point: Point, vector: Vector, length: float, name: Optional[str] = None
# ) -> str:
#     c_point = CPoint(**point.model_dump())
#     c_vector = CVector(**vector.model_dump())
#     line = CLine(c_point, c_vector, name)
#     return line.to_jsonstring()


# Plane creation service
# def create_plane_form_point_normal(
#     point: Point, normal: Vector, name: Optional[str] = None
# ):
#     c_point = CPoint(point.x, point.y, point.z)
#     c_normal = CVector(normal.x, normal.y, normal.z)
#     plane = CPlane(c_point, c_normal, name)
#     return {plane.to_jsonstring()}


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


def extrude_line(line: Line, vector: Vector) -> str:
    c_line = CLine(line.data.start, line.data.end)
    curve = NurbsCurve.from_line(c_line)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    mesh = surface.to_mesh()
    return mesh.to_jsonstring()
