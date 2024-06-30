// src/api/meshAPI.ts
import BaseAPI from './baseAPI';
import type { Vector, Polyline, OCCNurbsSurfaceResponse, Line, } from '../types';


export default class SurfaceAPI extends BaseAPI {
    /**
     * The subpath for the surface API.
     */
    private static readonly subPath = 'geometry/surface';

    /**
     * Extrudes a line by a given vector and returns the resulting NURBS surface.
     * @param line The line to be extruded.
     * @param vector The vector by which the line should be extruded.
     * @returns A promise that resolves to the resulting NURBS surface.
     */
    public static async extrudeLine(line: Line, vector: Vector): Promise<OCCNurbsSurfaceResponse> {
        return this.callApiAndParse(this.subPath, 'extrude_line', { line, vector });
    }

    /**
     * Extrudes a polyline along a given vector and returns a THREE.Mesh object.
     * @param polyline The polyline to be extruded.
     * @param vector The vector along which the polyline should be extruded.
     * @returns A Promise that resolves to a THREE.Mesh object representing the extruded geometry.
     */
    public static async extrudePolyline(polyline: Polyline, vector: Vector): Promise<OCCNurbsSurfaceResponse> {
        return this.callApiAndParse(this.subPath, 'extrude_polyline', { vector, polyline });
    }

    public static loftCurves(polylines: Polyline[]) {

        return this.callApiAndParse(this.subPath, 'loft', { polylines: polylines });
    }
}

