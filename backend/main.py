from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.geometry import *

__version__ = "0.1.0"


def create_app() -> FastAPI:
    """
    Application factory function
    """
    app = FastAPI()

    origins = [
        "*",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Include routers
    app.include_router(point_router)
    app.include_router(mesh_router)
    app.include_router(vector_router)
    app.include_router(curve_router)
    app.include_router(surface_router)
    app.include_router(line_router)
    app.include_router(polyline_router)

    return app


app = create_app()


@app.get("/")
def read_root():
    """
    Root GET route. Returns service status information.
    """
    return {"status": "OK", "service_name": "CompasNode-API", "version": __version__}
