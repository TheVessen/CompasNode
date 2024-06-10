from fastapi import APIRouter, Body, HTTPException
from compas.geometry import Point as CPoint
from ...models.geometry.geometry_models import Point, Coordinates

point_router = APIRouter(
    prefix="/geometry/point",
    tags=["geometry", "point"],
    responses={404: {"description": "Not found"}},
)


@point_router.post("/create", response_model=str)
def create(point: Coordinates) -> str:
    try:
        compas_point = CPoint(point.x, point.y, point.z)
        return compas_point.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@point_router.post("/add", response_model=str)
def add(point1: Point, point2: Point) -> str:
    try:
        result_point = point1.to_compas() + point2.to_compas()
        return result_point.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@point_router.post("/subtract", response_model=str)
def subtract(point1: Point, point2: Point) -> str:
    try:
        result_point = point1.to_compas() - point2.to_compas()
        return result_point.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@point_router.post("/multiply", response_model=str)
def multiply(point: Point = Body(...), factor: float = Body(...)) -> str:
    try:
        result_point = point.to_compas() * factor
        return result_point.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@point_router.post("/divide", response_model=str)
def divide(point: Point = Body(...), factor: float = Body(...)) -> str:
    if factor == 0:
        raise HTTPException(status_code=400, detail="Division by zero is not allowed.")
    try:
        result_point = point.to_compas() / factor
        return result_point.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@point_router.post("/distance_to_point", response_model=float)
def distance(point1: Point = Body(...), point2: Point = Body(...)) -> float:
    try:
        distance_value = point1.to_compas().distance_to_point(point2.to_compas())
        return distance_value
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
