from compas.geometry import Brep
from compas.geometry import NurbsCurve, Point, Vector


point1 = Point(0, 0, 0)
point2 = Point(0, 100, 0)

line = NurbsCurve.from_points([point1, point2], degree=1)

vector = Vector(0, 0, 100)

brep = Brep.from_extrusion(line, vector)
print(brep.to_jsonstring())
