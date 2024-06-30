// src/types.ts
export type APIConfiguration = {
    apiKey: string;
    host: string;
};

export type Coordinates = {
    x: number;
    y: number;
    z: number;
    name?: string;
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

export type CompasMeshStructure = {
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

export type CompassMesh = {
    data: CompasMeshStructure;
    dtype: string;
    guid: string;
};

export type Line = {
    data: {
        start: [number, number, number];
        end: [number, number, number];
    };
    dtype: string;
    guid: string;
};

export type NurbsSurfaceStructure = {
    degree_u: number;
    degree_v: number;
    is_periodic_u: boolean;
    is_periodic_v: boolean;
    knots_u: number[];
    knots_v: number[];
    mults_u: number[];
    mults_v: number[];
    points: number[][][];
    weights: number[][][];
    dtype: string;
    guid: string;
};

export type OCCNurbsSurfaceResponse = {
    data: NurbsSurfaceStructure;
    display: CompassMesh;
};

export type Point = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

export type Polyline = {
    data: PolylineData
    dtype: string;
    guid: string;
};

type PolylineData = {
    points: Array<[number, number, number]>;
};

export type Vector = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};