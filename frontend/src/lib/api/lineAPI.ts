// src/api/lineAPI.ts
import BaseAPI from './baseAPI';
import type { Point, Vector, Line } from '../types';

export default class LineAPI extends BaseAPI {
    private static readonly subPath = 'geometry/line';

    public static async createLineFromPoints(point1: Point, point2: Point, name?: string): Promise<Line> {
        const data = { point1, point2, name };
        return this.callApiAndParse(this.subPath, 'create-from-points', data);
    }

    public static async createLineFromDirection(point: Point, direction: Vector, length: number): Promise<Line> {
        const data = { point, direction, length };
        return this.callApiAndParse(this.subPath, 'create-from-direction', data);
    }
}
