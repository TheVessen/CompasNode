import { BaseAPI, type Coordinates, type Point } from '$lib';

// Point API

export class PointAPI extends BaseAPI {
    private static readonly subPath = 'geometry/point';

    public static async createPoint(point: Coordinates): Promise<Point> {
        return this.callApi(this.subPath, 'create', point);
    }
}
