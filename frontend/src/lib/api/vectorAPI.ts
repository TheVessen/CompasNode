// src/api/vectorAPI.ts
import BaseAPI from './baseAPI';
import type { Coordinates, Vector } from '../types';

export default class VectorAPI extends BaseAPI {
    private static readonly subPath = 'geometry/vector';

    public static async createVector(vector: Coordinates): Promise<Vector> {
        return this.callApi(this.subPath, 'create', vector);
    }
}
