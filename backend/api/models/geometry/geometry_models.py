from pydantic import BaseModel
from typing import Optional, Tuple, List


class Coordinates(BaseModel):
    x: float
    y: float
    z: float
    name: Optional[str] = None


class Point(BaseModel):
    data: Tuple[float, float, float]
    dtype: str
    guid: str
    name: Optional[str] = None


class Vector(BaseModel):
    data: Tuple[float, float, float]
    dtype: str
    guid: str
    name: Optional[str] = None


class Plane(BaseModel):
    a: float
    b: float
    c: float
    d: float
    name: Optional[str] = None


class LineData(BaseModel):
    start: List[float]
    end: List[float]


class Line(BaseModel):
    dtype: str
    data: LineData
    guid: str
