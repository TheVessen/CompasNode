// src/api/meshAPI.ts
import type { OCCNurbsSurfaceResponse, NurbsSurfaceStructure } from '../types';
import type * as THREE from 'three';
import { compassGeoToThreeMesh } from '$lib/services/compas-converters';

export class CompasSurface {
    private readonly data: NurbsSurfaceStructure;
    public readonly previewMesh: THREE.Mesh;
    public readonly degree_u: number;
    public readonly degree_v: number;
    public readonly is_periodic_u: boolean;
    public readonly is_periodic_v: boolean;
    public readonly knots_u: number[];
    public readonly knots_v: number[];
    public readonly mults_u: number[];
    public readonly mults_v: number[];
    public readonly points: number[][][];
    public readonly weights: number[][][];
    public readonly dtype: string;
    public readonly guid: string;

    /**
     * Constructs a new instance of the CompasSurface class.
     * @param compasSurfaceData - The data for the Compas surface.
     */
    constructor(compasSurfaceData: OCCNurbsSurfaceResponse) {

        // Initialize the data field
        this.data = compasSurfaceData.data;

        try {
            // Attempt to initialize the displayMesh field
            this.previewMesh = compassGeoToThreeMesh(compasSurfaceData.display.data.face, compasSurfaceData.display.data.vertex);
        } catch (error) {
            throw new Error('Failed to create display mesh from compasSurfaceData');
        }

        // Initialize the added fields from compasSurfaceData
        this.degree_u = compasSurfaceData.data.degree_u;
        this.degree_v = compasSurfaceData.data.degree_v;
        this.is_periodic_u = compasSurfaceData.data.is_periodic_u;
        this.is_periodic_v = compasSurfaceData.data.is_periodic_v;
        this.knots_u = compasSurfaceData.data.knots_u;
        this.knots_v = compasSurfaceData.data.knots_v;
        this.mults_u = compasSurfaceData.data.mults_u;
        this.mults_v = compasSurfaceData.data.mults_v;
        this.points = compasSurfaceData.data.points;
        this.weights = compasSurfaceData.data.weights;
        this.dtype = compasSurfaceData.data.dtype;
        this.guid = compasSurfaceData.data.guid;
    }

    toJson(): string {
        return JSON.stringify(this.data);
    }

}
