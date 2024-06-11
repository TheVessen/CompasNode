// src/api/meshAPI.ts
import BaseAPI from './baseAPI';
import type { Vector, Polyline } from '../types';
import type * as THREE from 'three';

export default class SurfaceAPI extends BaseAPI {
    private static readonly subPath = 'geometry/surface';
    public static async extrudePolyline(polyline: Polyline, vector: Vector): Promise<THREE.Mesh> {
        const response = await this.callApiAndParse(this.subPath, 'extrude_polyline', { vector, polyline });
        console.log(response);
        return this.createMesh(response.data.face, response.data.vertex);
    }
}
