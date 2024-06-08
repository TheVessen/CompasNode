from typing import Union
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api.routes.geometry.geometry_route import router as geometry_router

# Define version using __version__
__version__ = "1.0.0"

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

    app.include_router(geometry_router)

    return app

app = create_app()

@app.get("/")
def read_root():
    """
    Root GET route. Returns service status information.
    """
    return {
        "status": "OK",
        "service_name": "CompasNode-API",
        "version": __version__
    }

print(f"CompasNode-API v{__version__}")