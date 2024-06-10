// src/api/pointAPI.ts
import BaseAPI from './baseAPI';
import type { Coordinates, Point } from '../types';

export default class PointAPI extends BaseAPI {
    private static readonly subPath = 'geometry/point';

    public static async createPoint(point: Coordinates): Promise<Point> {
        return this.callApiAndParse(this.subPath, 'create', point);
    }

    public static async addPoints(point1: Point, point2: Point): Promise<string> {
        return this.callApiAndParse(this.subPath, 'add', { point1, point2 });
    }

    public static async subtractPoints(point1: Point, point2: Point): Promise<string> {
        return this.callApiAndParse(this.subPath, 'subtract', { point1, point2 });
    }

    public static async multiplyPoint(point: Point, factor: number): Promise<string> {
        return this.callApiAndParse(this.subPath, 'multiply', { point, factor });
    }

    public static async dividePoint(point: Point, factor: number): Promise<string> {
        return this.callApiAndParse(this.subPath, 'divide', { point, factor });
    }

    public static async distanceToPoint(point1: Point, point2: Point): Promise<number> {
        return this.callApi(this.subPath, 'distance_to_point', { point1, point2 });
    }
}
