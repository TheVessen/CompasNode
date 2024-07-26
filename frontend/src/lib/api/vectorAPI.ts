// src/api/vectorAPI.ts
// src/api/vectorAPI.ts
import BaseAPI from './baseAPI';
import type { Coordinates, Vector } from '../types';

export default class VectorAPI extends BaseAPI {
    private static readonly subPath = 'geometry/vector';

    /**
     * Creates a vector with the given coordinates.
     *
     * @param {Coordinates} vector - The coordinates of the vector to be created.
     * @returns {Promise<Vector>} A promise that resolves to the created vector.
     */
    public static async createVector(vector: Coordinates): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'create', vector);
    }

    /**
     * Adds two vectors and returns the resulting vector.
     *
     * @param {Vector} vector1 - The first vector to be added.
     * @param {Vector} vector2 - The second vector to be added.
     * @returns {Promise<Vector>} A promise that resolves to the result of the addition.
     */
    public static async addVectors(vector1: Vector, vector2: Vector): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'add', { vector1, vector2 });
    }

    /**
     * Subtracts the second vector from the first and returns the resulting vector.
     *
     * @param {Vector} vector1 - The vector to subtract from.
     * @param {Vector} vector2 - The vector to be subtracted.
     * @returns {Promise<Vector>} A promise that resolves to the result of the subtraction.
     */
    public static async subtractVectors(vector1: Vector, vector2: Vector): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'subtract', { vector1, vector2 });
    }

    /**
     * Scales a vector by a given factor and returns the resulting vector.
     *
     * @param {Vector} vector - The vector to be scaled.
     * @param {number} factor - The scaling factor.
     * @returns {Promise<Vector>} A promise that resolves to the result of the scaling.
     */
    public static async scaleVector(vector: Vector, factor: number): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'scale', { vector, factor });
    }

    /**
     * Gets the direction of a vector and returns it as a vector.
     *
     * @param {Vector} vector - The vector whose direction is to be determined.
     * @returns {Promise<Vector>} A promise that resolves to the direction of the vector.
     */
    public static async getDirection(vector: Vector): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'get_direction', vector);
    }

    /**
     * Calculates the cross product of two vectors and returns the resulting vector.
     *
     * @param {Vector} vector1 - The first vector.
     * @param {Vector} vector2 - The second vector.
     * @returns {Promise<Vector>} A promise that resolves to the result of the cross product.
     */
    public static async crossProduct(vector1: Vector, vector2: Vector): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'cross_product', { vector1, vector2 });
    }

    /**
     * Calculates the dot product of two vectors and returns the result as a number.
     *
     * @param {Vector} vector1 - The first vector.
     * @param {Vector} vector2 - The second vector.
     * @returns {Promise<number>} A promise that resolves to the result of the dot product.
     */
    public static async dotProduct(vector1: Vector, vector2: Vector): Promise<number> {
        return this.callApi(this.subPath, 'dot_product', { vector1, vector2 });
    }

    /**
     * Gets the length (magnitude) of a vector and returns it as a number.
     *
     * @param {Vector} vector - The vector whose length is to be determined.
     * @returns {Promise<number>} A promise that resolves to the length of the vector.
     */
    public static async getLength(vector: Vector): Promise<number> {
        return this.callApi(this.subPath, 'length', vector);
    }

    /**
     * Converts a vector to its unit vector (a vector with magnitude of 1) and returns it.
     *
     * @param {Vector} vector - The vector to be unitized.
     * @returns {Promise<Vector>} A promise that resolves to the unit vector.
     */
    public static async getUnitVector(vector: Vector): Promise<Vector> {
        return this.callApiAndParse(this.subPath, 'unitize', vector);
    }

    /**
     * Calculates the angle between two vectors and returns the short angle it as a number.
     *
     * @param {Vector} vector1 - The first vector.
     * @param {Vector} vector2 - The second vector.
     * @param {boolean} [rad=true] - Whether to return the angle in radians (true) or degrees (false).
     * @param {boolean} [shortest=true] - Whether to return the shortest angle between the vectors (true) or the larger angle (false).
     * @returns {Promise<number>} A promise that resolves to the angle between the vectors.
     */
    public static async getAngle(vector1: Vector, vector2: Vector, rad: boolean = true, shortAngle: boolean = true): Promise<number> {
        let angle = await this.callApi(this.subPath, 'angle', { vector1, vector2, rad }) as number;
        return angle;
        //TODO: Implement short angle calculation
    }
}