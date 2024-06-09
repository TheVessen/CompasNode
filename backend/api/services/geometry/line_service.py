from ...models.geometry.geometry_models import Point, Vector
from typing import Optional
from compas.geometry import Line as CLine


# Line creation service
def create_line_from_points(
    point1: Point, point2: Point, name: Optional[str] = None
) -> str:
    line = CLine(point1.to_compas(), point2.to_compas(), name)
    return line.to_jsonstring()


def create_line_from_direction(point: Point, vector: Vector, length: float) -> str:
    c_point = point.to_compas()
    c_vector = vector.to_compas().unitized()
    line = CLine.from_point_direction_length(c_point, c_vector, length)
    return line.to_jsonstring()
