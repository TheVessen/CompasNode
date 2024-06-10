from ...models.geometry.geometry_models import Point
from typing import Optional
from compas.geometry import Polyline as CPolyline


def create_polyline_from_points(points: list[Point], name: Optional[str] = None) -> str:
    """
    Create a polyline from a list of points.

    Args:
        points (list[Point]): A list of points to create the polyline from.
        name (Optional[str], optional): The name of the polyline. Defaults to None.

    Returns:
        str: The JSON representation of the created polyline.
    """
    c_points = [point.to_compas() for point in points]
    polyline = CPolyline(c_points, name)
    return polyline.to_jsonstring()
