// src/api/baseAPI.ts
import type { FaceData, VertexData } from '$lib/types';
import axios, { AxiosError, type AxiosInstance } from 'axios';
import * as THREE from 'three';

export default abstract class BaseAPI {
    protected static axiosInstance: AxiosInstance;
    protected static basePath: string;
    protected static loggingEnabled: boolean = false;

    public static set host(value: string) {
        this.axiosInstance = axios.create({
            baseURL: value,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    public static set apiKey(value: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${value}`;
    }

    public static set logging(value: boolean) {
        this.loggingEnabled = value;
    }

    protected static handleError(error: AxiosError): void {
        if (error.response) {
            console.error('Response error details:', error.response.data);
        } else if (error.request) {
            console.error('Request data:', error.request);
        }
        throw error;
    }

    protected static async callApi(subPath: string, endpoint: string, data: any): Promise<any> {
        try {
            const startTime = Date.now();
            const response = await this.axiosInstance.post(`${subPath}/${endpoint}`, data);
            const endTime = Date.now();
            if (this.loggingEnabled) {
                console.log(`API call to ${subPath}/${endpoint} took ${endTime - startTime} ms`);
            }
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }

    protected static async callApiAndParse(subPath: string, endpoint: string, data: any): Promise<any> {
        try {
            const startTime = Date.now();
            const response = await this.axiosInstance.post(`${subPath}/${endpoint}`, data);
            const endTime = Date.now();
            if (this.loggingEnabled) {
                console.log(`API call to ${subPath}/${endpoint} took ${endTime - startTime} ms`);
            }
            return JSON.parse(response.data);
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }

    protected static createMesh(faceData: FaceData, vertexData: VertexData): THREE.Mesh {
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


}

