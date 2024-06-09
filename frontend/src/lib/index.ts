import axios from 'axios';
import * as THREE from 'three';

type Coordinates = {
    x: number;
    y: number;
    z: number;
    name?: string;
};

type Point = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

type Vector = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

type Line = {
    data: {
        start: [number, number, number];
        end: [number, number, number];
    };
    dtype: string;
    guid: string;
};

export class GeometryAPI {
    private static handleError(error: any) {
        console.error('Error:', error);
        throw error;
    }

    private static async callGeoApi(endpoint: string, data: any): Promise<any> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/geometry/${endpoint}`, data);
            return JSON.parse(response.data);
        } catch (error) {
            this.handleError(error);
        }
    }

    public static async createPoint(point: Coordinates): Promise<Point> {
        return this.callGeoApi('create-point', point);
    }

    public static async createVector(vector: Coordinates): Promise<Vector> {
        return this.callGeoApi('create-vector', vector);
    }

    public static async createLineFromPoints(point1: Point, point2: Point, name?: string): Promise<Line> {
        const data = { point1, point2, name };
        return this.callGeoApi('create-line-from-points', data);
    }

    public static async createLineFromDirection(point: Point, direction: Vector, length: number): Promise<Line> {
        const data = { point, direction, length };
        return this.callGeoApi('create-line-from-direction', data);
    }


}

export class PointAPI {
    private static handleError(error: any) {
        console.error('Error:', error);
        throw error;
    }

    private static async callPointApi(endpoint: string, data: any): Promise<any> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/geometry/point/${endpoint}`, data);
            return JSON.parse(response.data);
        } catch (error) {
            PointAPI.handleError(error);
        }
    }

    public static async createPoint(point: Coordinates): Promise<Point> {
        return PointAPI.callPointApi('create', point);
    }
}

type VertexAttributes = {
    x: number;
    y: number;
    z: number;
};

type FaceData = {
    [key: number]: any;
};

type VertexData = {
    [key: number]: VertexAttributes;
};

type MeshData = {
    attributes: any;
    default_edge_attributes: any;
    default_face_attributes: any;
    default_vertex_attributes: VertexAttributes;
    edgedata: any;
    face: FaceData;
    facedata: FaceData;
    max_face: number;
    max_vertex: number;
    vertex: VertexData;
};

type Mesh = {
    data: MeshData;
    dtype: string;
    guid: string;
};

export class MeshAPI {
    private static handleError(error: any) {
        console.error('Error:', error);
        throw error;
    }

    private static createMesh(faceData: FaceData, vertexData: VertexData) {
        const vertices: number[] = [];
        const indices: number[] = [];

        // Create vertices
        for (const key in vertexData) {
            const vertex = vertexData[key];
            if (vertex) {
                vertices.push(vertex.x, vertex.y, vertex.z);
            }
        }

        // Create faces
        for (const key in faceData) {
            const face = faceData[key];
            // Split the quad into two triangles: (0, 1, 2) and (2, 3, 0)
            indices.push(face[0], face[1], face[2]);
            indices.push(face[2], face[3], face[0]);
        }

        let mesh = this.VerticesToThreeMesh(vertices, indices);

        return mesh;

    }

    private static VerticesToThreeMesh(
        vertices: number[] | Float32Array,
        indices: number[] | Uint32Array,
    ) {
        const floatVertices = new Float32Array(vertices);
        const floatFaceIndices = new Uint32Array(indices);
        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute(
            "position",
            new THREE.BufferAttribute(floatVertices, 3),
        );
        geometry.setIndex(new THREE.BufferAttribute(floatFaceIndices, 1)); // Use faces as indices
        geometry.computeVertexNormals(); // This will compute the normals if not provided

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

    private static async callMeshApi(endpoint: string, data: any): Promise<any> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/geometry/mesh/${endpoint}`, data);
            return JSON.parse(response.data);
        } catch (error) {
            MeshAPI.handleError(error);
        }
    }

    public static async createMeshFromExtrusion(vector: Vector, line: Line): Promise<THREE.Mesh<THREE.BufferGeometry<THREE.NormalBufferAttributes>, THREE.MeshBasicMaterial, THREE.Object3DEventMap>> {
        let mesh = await this.callMeshApi('extrude-line', { vector: vector, line: line }) as Mesh;
        console.log(mesh);
        return this.createMesh(mesh.data.face, mesh.data.vertex);
    }
}

export default new GeometryAPI();