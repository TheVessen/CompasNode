// src/types.ts
export type Coordinates = {
    x: number;
    y: number;
    z: number;
    name?: string;
};

export type Point = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

export type Vector = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

export type Line = {
    data: {
        start: [number, number, number];
        end: [number, number, number];
    };
    dtype: string;
    guid: string;
};

export type VertexAttributes = {
    x: number;
    y: number;
    z: number;
};

export type FaceData = {
    [key: number]: any;
};

export type VertexData = {
    [key: number]: VertexAttributes;
};

export type MeshData = {
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

export type Mesh = {
    data: MeshData;
    dtype: string;
    guid: string;
};

export type ApiConfig = {
    apiKey: string;
    host: string;
};
