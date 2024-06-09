// src/api/pointAPI.ts
import BaseAPI from './baseAPI';
import type { Coordinates, Point } from '../types';

export default class PointAPI extends BaseAPI {
    private static readonly subPath = 'geometry/point';

    public static async createPoint(point: Coordinates): Promise<Point> {
        return this.callApi(this.subPath, 'create', point);
    }
}
