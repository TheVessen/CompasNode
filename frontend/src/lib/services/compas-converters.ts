import type { FaceData, VertexData } from "$lib/types";
import * as THREE from "three";
import { cNBaseMaterial } from "../utils/threeMaterials";

/**
 * Converts compass geometry to a Three.js mesh.
 * 
 * @param faceData - The face data of the compass geometry.
 * @param vertexData - The vertex data of the compass geometry.
 * @returns The Three.js mesh representing the compass geometry.
 */
export function compassGeoToThreeMesh(faceData: FaceData, vertexData: VertexData): THREE.Mesh {

    const buffer = verticesToTHREEBuffer(faceData, vertexData);
    const mesh = new THREE.Mesh(buffer, cNBaseMaterial);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    return mesh;
}

/**
 * Converts face and vertex data to a THREE.BufferGeometry object.
 * 
 * @param faceData - The face data.
 * @param vertexData - The vertex data.
 * @returns A THREE.BufferGeometry object representing the converted data.
 */
function verticesToTHREEBuffer(faceData: FaceData, vertexData: VertexData): THREE.BufferGeometry {

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
    const floatVertices = new Float32Array(vertices);
    const floatFaceIndices = new Uint32Array(indices);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(floatVertices, 3));
    geometry.setIndex(new THREE.BufferAttribute(floatFaceIndices, 1));
    geometry.computeVertexNormals();

    return geometry;
}