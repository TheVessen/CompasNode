// src/api/meshAPI.ts
import BaseAPI from './baseAPI';
import type { Vector, Line } from '../types';
import type * as THREE from 'three';

export default class MeshAPI extends BaseAPI {
    private static readonly subPath = 'geometry/mesh';


    public static async createMeshFromExtrusion(vector: Vector, line: Line): Promise<THREE.Mesh> {
        const response = await this.callApi(this.subPath, 'extrude-line', { vector, line });
        return this.createMesh(response.data.face, response.data.vertex);
    }


}
