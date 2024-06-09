// src/api/meshAPI.ts
import BaseAPI from './baseAPI';
import type { FaceData, VertexData, Mesh, Vector, Line } from '../types';
import * as THREE from 'three';

export default class MeshAPI extends BaseAPI {
    private static readonly subPath = 'geometry/mesh';

    private static createMesh(faceData: FaceData, vertexData: VertexData): THREE.Mesh {
        const vertices: number[] = [];
        const indices: number[] = [];

        for (const key in vertexData) {
            const vertex = vertexData[key];
            if (vertex) {
                vertices.push(vertex.x, vertex.y, vertex.z);
            }
        }

        for (const key in faceData) {
            const face = faceData[key];
            indices.push(face[0], face[1], face[2]);
            indices.push(face[2], face[3], face[0]);
        }

        return this.verticesToThreeMesh(vertices, indices);
    }

    private static verticesToThreeMesh(vertices: number[], indices: number[]): THREE.Mesh {
        const floatVertices = new Float32Array(vertices);
        const floatFaceIndices = new Uint32Array(indices);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(floatVertices, 3));
        geometry.setIndex(new THREE.BufferAttribute(floatFaceIndices, 1));
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhysicalMaterial({
            clearcoat: 1,
            clearcoatRoughness: 0.4,
            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        return mesh;
    }

    public static async createMeshFromExtrusion(vector: Vector, line: Line): Promise<THREE.Mesh> {
        const response = await this.callApi(this.subPath, 'extrude-line', { vector, line });
        return this.createMesh(response.data.face, response.data.vertex);
    }
}
