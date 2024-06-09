from ...models.geometry.geometry_models import Line, Vector
from compas.geometry import Line as CLine, Vector as CVector, NurbsCurve
from compas_occ.geometry import OCCNurbsSurface


def extrude_line(line: Line, vector: Vector) -> str:
    c_line = CLine(line.data.start, line.data.end)
    curve = NurbsCurve.from_line(c_line)
    c_vector = CVector.__from_data__(vector.data)
    surface = OCCNurbsSurface.from_extrusion(curve, c_vector)
    mesh = surface.to_mesh()
    return mesh.to_jsonstring()
