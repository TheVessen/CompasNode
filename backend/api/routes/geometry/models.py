from pydantic import BaseModel

class Point(BaseModel):
    x: float
    y: float
    z: float