from ...models.geometry.geometry_models import Line, Vector, Polyline
from compas.geometry import (
    Line as CLine,
    Vector as CVector,
    NurbsCurve,
    Polyline as CPolyline,
)
from compas_occ.geometry import OCCNurbsSurface
from compas_occ.geometry import OCCNurbsCurve
from compas import scene
import json


def convert_to_surface_response(surface: OCCNurbsSurface) -> str:
    """
    Converts an OCCNurbsSurface object to a JSON string representation of the surface and its corresponding mesh.

    Args:
        surface (OCCNurbsSurface): The OCCNurbsSurface object to convert.

    Returns:
        str: A JSON string representation of the surface and its corresponding mesh.
    """
    mesh = surface.to_mesh()

    # Parse the JSON strings to Python objects
    surface_data = json.loads(surface.to_jsonstring())
    mesh_data = json.loads(mesh.to_jsonstring())

    # Construct the return value with the parsed data
    return_value = {
        "data": surface_data,
        "display": mesh_data,
    }

    return json.dumps(return_value)
