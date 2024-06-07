
from compas.geometry import Point as CompasPoint
from .models import Point

def create_point(point: Point):
    compas_point = CompasPoint(point.x, point.y, point.z)
    return {"point": compas_point.to_jsonstring()}

