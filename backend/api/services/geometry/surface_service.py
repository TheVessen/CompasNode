from ...models.geometry.geometry_models import Line, Vector, Polyline
from compas.geometry import (
    Line as CLine,
    Vector as CVector,
    NurbsCurve,
    Polyline as CPolyline,
)
from compas_occ.geometry import OCCNurbsSurface
from compas_occ.geometry import OCCNurbsCurve


def extrude_line(line: Line, vector: Vector) -> str:
    c_line = CLine(line.data.start, line.data.end)
    curve = NurbsCurve.from_line(c_line)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    mesh = surface.to_mesh()
    return mesh.to_jsonstring()


def extrude_polyline(polyline: Polyline, vector: Vector) -> str:
    c_polyline = CPolyline(polyline.data.points)
    curve = OCCNurbsCurve.from_points(c_polyline.points, degree=1)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    mesh = surface.to_mesh()
    return mesh.to_jsonstring()
