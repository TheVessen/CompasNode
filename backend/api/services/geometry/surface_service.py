from ...models.geometry.geometry_models import Line, Vector, Polyline, PolylineInput
from compas.geometry import (
    Line as CLine,
    Vector as CVector,
    NurbsCurve,
    Polyline as CPolyline,
)
from compas_occ.geometry import OCCNurbsSurface
from compas_occ.geometry import OCCNurbsCurve
from compas_occ.brep import Brep
from compas.geometry import Curve
import json
from typing import List


def extrude_line(line: Line, vector: Vector) -> OCCNurbsSurface:
    c_line = CLine(line.data.start, line.data.end)
    curve = NurbsCurve.from_line(c_line)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    return surface


def extrude_polyline(polyline: Polyline, vector: Vector) -> OCCNurbsSurface:
    c_polyline = CPolyline(polyline.data.points)
    curve = NurbsCurve.from_points(c_polyline.points, degree=1)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    return surface


def loft(polyline: List[Polyline]) -> str:
    curves = []

    for p in polyline:
        c_polyline = CPolyline(p.data.points)
        curve = OCCNurbsCurve.from_points(c_polyline.points, degree=3)
        curves.append(curve)

        vect = CVector(0, 0, 100)

    resBrep = Brep.from_loft(curves)
    return resBrep.to_jsonstring()
