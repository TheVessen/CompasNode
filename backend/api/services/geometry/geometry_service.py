from compas.geometry import (
    Point as CPoint,
    Vector as CVector,
    Line as CLine,
    Plane as CPlane

)
from ...models.geometry.models import (
    Coordinates,
    Point
)
from typing import Optional, Dict

#Service functions for creating geometry objects

#Point creation service
def create_point(point: Coordinates):
    compas_point = CPoint(point.x, point.y, point.z, point.name)
    return {compas_point.to_jsonstring()}

#Vector creation service
def create_vector(input_vector: Coordinates):
    vector = CVector(input_vector.x, input_vector.y, input_vector.z, input_vector.name)
    return {vector.to_jsonstring()}

#Line creation service
def create_line_from_points(point1: Coordinates, point2: Coordinates, name: Optional[str] = None):
    line = CLine(CPoint(point1.x, point1.y, point1.z), CPoint(point2.x, point2.y, point2.z),name)
    return {line.to_jsonstring()}

def create_line_from_direction(point: Coordinates, vector: Coordinates, length: float, name: Optional[str] = None):
    c_point = CPoint(**point.model_dump())
    c_vector = CVector(vector.x, vector.y, vector.z, vector.name).unitized()
    line = CLine(c_point, c_vector * length, name)
    return {line.to_jsonstring()}

def create_line_from_vector(point: Coordinates, vector: Coordinates, name: Optional[str] = None):
    c_point = CPoint(**point.model_dump())
    c_vector = CVector(vector.x, vector.y, vector.z, vector.name)
    line = CLine(c_point, c_vector, name)
    return {line.to_jsonstring()}

#Plane creation service
def create_plane_form_point_normal(point: Coordinates, normal: Coordinates, name: Optional[str] = None):
    c_point = CPoint(point.x, point.y, point.z)
    c_normal = CVector(normal.x, normal.y, normal.z)
    plane = CPlane(c_point, c_normal, name)
    return {plane.to_jsonstring()}

def create_plane_from_three_points(point1: Coordinates, point2: Coordinates, point3: Coordinates, name: Optional[str] = None):
    c_point1 = CPoint(point1.x, point1.y, point1.z)
    c_point2 = CPoint(point2.x, point2.y, point2.z)
    c_point3 = CPoint(point3.x, point3.y, point3.z)
    plane = CPlane.from_three_points(c_point1, c_point2, c_point3)
    return {plane.to_jsonstring()}

def create_plane_from_point_and_two_vectors(point: Coordinates, vector1: Coordinates, vector2: Coordinates, name: Optional[str] = None):
    c_point = CPoint(point.x, point.y, point.z)
    c_vector1 = CVector(vector1.x, vector1.y, vector1.z)
    c_vector2 = CVector(vector2.x, vector2.y, vector2.z)
    plane = CPlane.from_point_and_two_vectors(c_point, c_vector1, c_vector2)
    return {plane.to_jsonstring()}