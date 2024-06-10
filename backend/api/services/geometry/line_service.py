from ...models.geometry.geometry_models import Point, Vector
from typing import Optional
from compas.geometry import Line as CLine, Polyline as CPolyline, Point as CPoint

###############
# Line Creation
###############


def create_line_from_points(
    point1: Point, point2: Point, name: Optional[str] = None
) -> str:
    """
    Creates a line from two points.

    Args:
        point1 (Point): The first point.
        point2 (Point): The second point.
        name (str, optional): The name of the line. Defaults to None.

    Returns:
        str: The line represented as a JSON string.
    """
    line = CLine(point1.to_compas(), point2.to_compas(), name)
    return line.to_jsonstring()


def create_line_from_point_vector(
    point: Point, vector: Vector, name: Optional[str] = None
) -> str:
    """
    Creates a line from a point and a vector.

    Args:
        point (Point): The starting point of the line.
        vector (Vector): The direction vector of the line.
        name (Optional[str], optional): The name of the line. Defaults to None.

    Returns:
        str: The line represented as a JSON string.
    """
    line = CLine(point.to_compas(), vector.to_compas(), name)
    return line.to_jsonstring()


def create_line_from_direction(point: Point, vector: Vector, length: float) -> str:
    """
    Creates a line from a given point, direction vector, and length.

    Args:
        point (Point): The starting point of the line.
        vector (Vector): The direction vector of the line.
        length (float): The length of the line.

    Returns:
        str: The line represented as a JSON string.
    """
    c_point = point.to_compas()
    c_vector = vector.to_compas().unitized()
    line = CLine.from_point_direction_length(c_point, c_vector, length)
    return line.to_jsonstring()


################
# Line operations
################


def line_length(line: CLine) -> float:
    """
    Returns the length of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        float: The length of the line.
    """
    return line.length


def line_midpoint(line: CLine) -> str:
    """
    Returns the midpoint of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        str: The midpoint of the line represented as a JSON string.
    """
    midpoint = line.midpoint
    return midpoint.to_jsonstring()


def line_direction(line: CLine) -> str:
    """
    Returns the direction of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        str: The direction of the line represented as a JSON string.
    """
    direction = line.direction
    return direction.to_jsonstring()


def line_vector(line: CLine) -> str:
    """
    Returns the vector of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        str: The vector of the line represented as a JSON string.
    """
    vector = line.vector
    return vector.to_jsonstring()


def line_start(line: CLine) -> str:
    """
    Returns the start point of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        str: The start point of the line represented as a JSON string.
    """
    start = line.start
    return start.to_jsonstring()


def line_end(line: CLine) -> str:
    """
    Returns the end point of a line.

    Args:
        line (CLine): The line to measure.

    Returns:
        str: The end point of the line represented as a JSON string.
    """
    end = line.end
    return end.to_jsonstring()


def point_at_length(line: CLine, length: float) -> str:
    """
    Returns the point at a given length along a line.

    Args:
        line (CLine): The line to measure.
        length (float): The length along the line.

    Returns:
        str: The point at the given length represented as a JSON string.
    """
    point = line.point_at(length)
    return point.to_jsonstring()


def line_closest_point(line: CLine, point: Point):
    """
    Returns the closest point on a line to a given point.

    Args:
        line (CLine): The line to measure.
        point (Point): The point to find the closest point on the line to.

    Returns:
        str: The closest point on the line represented as a JSON string.
    """
    closest_point = line.closest_point(point.to_compas())
    # TODO: Return the parameter of the closest point as well

    return NotImplementedError


def line_divide_by_count(line: CLine, count: int):
    """
    Checks if a point is on a line.

    Args:
        line (CLine): The line to check.
        point (Point): The point to check.

    Returns:
        bool: True if the point is on the line, False otherwise.
    """
    return NotImplementedError
