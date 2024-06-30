import type { Point, Polyline } from '$lib/types';
import BaseAPI from './baseAPI';

export default class PolylineAPI extends BaseAPI {
    private static readonly subPath = 'geometry/polyline';

    /**
     * Creates a polyline with the given coordinates.
     *
     * @param {Coordinates[]} polyline - The coordinates of the polyline to be created.
     * @returns {Promise<Point>} A promise that resolves to the created polyline.
     */
    public static async createPolyline(points: Point[]): Promise<Polyline> {
        return this.callApiAndParse(this.subPath, 'create', points);
    }
}