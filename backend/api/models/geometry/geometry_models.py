from pydantic import BaseModel
from typing import Optional, Tuple, List
from compas.geometry import (
    Point as CPoint,
    Vector as CVector,
    Line as CLine,
    Plane as CPlane,
)


from pydantic import BaseModel, Field


class Coordinates(BaseModel):
    x: float = Field(..., description="The x coordinate.")
    y: float = Field(..., description="The y coordinate.")
    z: float = Field(..., description="The z coordinate.")
    name: Optional[str] = Field(
        None, description="The name of the point.", min_length=1
    )

    class Config:
        error_messages = {
            "x": {"type_error": "x must be a number."},
            "y": {"type_error": "y must be a number."},
            "z": {"type_error": "z must be a number."},
            "name": {
                "min_length": "name must be at least one character long.",
                "type_error": "name must be a string.",
            },
        }


class Point(BaseModel):
    data: Tuple[float, float, float] = Field(
        ..., description="The coordinates of the point."
    )
    dtype: str = Field(..., description="The data type of the point.")
    guid: str = Field(..., description="The unique identifier of the point.")
    name: Optional[str] = Field(None, description="The name of the point.")

    class Config:
        error_messages = {
            "data": {"type_error": "data must be a tuple of three numbers."},
            "dtype": {"type_error": "dtype must be a string."},
            "guid": {"type_error": "guid must be a string."},
            "name": {"type_error": "name must be a string."},
        }

    def to_compas(self):
        return CPoint(*self.data, name=self.name)


class Vector(BaseModel):
    data: Tuple[float, float, float] = Field(
        ..., description="The coordinates of the vector."
    )
    dtype: str = Field(..., description="The data type of the vector.")
    guid: str = Field(..., description="The unique identifier of the vector.")
    name: Optional[str] = Field(None, description="The name of the vector.")

    class Config:
        error_messages = {
            "data": {"type_error": "data must be a tuple of three numbers."},
            "dtype": {"type_error": "dtype must be a string."},
            "guid": {"type_error": "guid must be a string."},
            "name": {"type_error": "name must be a string."},
        }

    def to_compas(self):
        return CVector(*self.data, name=self.name)


class Plane(BaseModel):
    point: Point
    normal: Vector
    name: Optional[str] = None

    class Config:
        error_messages = {
            "point": {"type_error": "point must be an instance of Point."},
            "normal": {"type_error": "normal must be an instance of Vector."},
            "name": {"type_error": "name must be a string."},
        }

    def to_compas(self):
        return CPlane(self.point.to_compas(), self.normal.to_compas(), name=self.name)


class LineData(BaseModel):
    start: List[float]
    end: List[float]

    class Config:
        error_messages = {
            "start": {"type_error": "start must be a list of numbers."},
            "end": {"type_error": "end must be a list of numbers."},
        }


class Line(BaseModel):
    dtype: str
    data: LineData
    guid: str

    class Config:
        error_messages = {
            "dtype": {"type_error": "dtype must be a string."},
            "data": {"type_error": "data must be an instance of LineData."},
            "guid": {"type_error": "guid must be a string."},
        }

    def to_compas(self):
        return CLine(self.data.start, self.data.end, name=self.guid)
