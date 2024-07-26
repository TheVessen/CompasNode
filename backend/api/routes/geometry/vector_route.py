from fastapi import APIRouter, Body, HTTPException
from ...services.geometry.vector_service import *
from compas.geometry import (
    Vector as CVector,
)
from ...models.geometry.geometry_models import Point, Vector, Coordinates

vector_router = APIRouter(
    prefix="/geometry/vector",
    tags=["vector"],
    responses={404: {"description": "Not found"}},
)

# NOTE: All operations taking more than two lines of code are moved to the services folder


@vector_router.get(
    "/",
    response_model=str,
)
def read_root() -> str:
    return CVector(0, 0, 0).to_jsonstring()


@vector_router.post("/create", response_model=str)
def create_vector(vector: Coordinates) -> str:
    try:
        compas_vector = CVector(vector.x, vector.y, vector.z)
        return compas_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/add", response_model=str)
def add_vector(vector1: Vector = Body(...), vector2: Vector = Body(...)) -> str:
    try:
        result_vector = vector1.to_compas() + vector2.to_compas()
        return result_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/subtract", response_model=str)
def subtract_vector(vector1: Vector = Body(...), vector2: Vector = Body(...)) -> str:
    try:
        result_vector = vector1.to_compas() - vector2.to_compas()
        return result_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/scale", response_model=str)
def multiply_vector(vector: Vector = Body(...), factor: float = Body(...)) -> str:
    try:
        result_vector = vector.to_compas().scaled(factor)
        return result_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/get_direction", response_model=str)
def distance_to_vector(vector: Vector = Body(...)) -> str:
    try:
        direction_vector = vector.to_compas().direction
        return direction_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/cross_product", response_model=str)
def cross_product(vector1: Vector = Body(...), vector2: Vector = Body(...)) -> str:
    try:
        result_vector = vector1.to_compas().cross(vector2.to_compas())
        return result_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/dot_product", response_model=float)
def dot_product(vector1: Vector = Body(...), vector2: Vector = Body(...)) -> float:
    try:
        result = vector1.to_compas().dot(vector2.to_compas())
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/length", response_model=float)
def length(vector: Vector = Body(...)) -> float:
    try:
        result = vector.to_compas().length
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@vector_router.post("/unitize", response_model=str)
def unitize(vector: Vector = Body(...)) -> str:
    try:
        result_vector = vector.to_compas().unitized()
        return result_vector.to_jsonstring()
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# TODO: test if works
@vector_router.post("/angle", response_model=float)
def get_angle(
    vector1: Vector = Body(...), vector2: Vector = Body(...), rad: bool = Body(True)
) -> float:
    try:
        angle = CVector.angle(vector1.to_compas(), vector2.to_compas(), rad)
        return angle
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


# NOTE: implemented till here in ts
