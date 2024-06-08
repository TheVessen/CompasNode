import axios from 'axios';

type Point = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

type Vector = {
    data: [number, number, number];
    dtype: string;
    guid: string;
    name?: string;
};

type Coordinates = {
    x: number;
    y: number;
    z: number;
    name?: string;
};


class GeometryAPI {
    private handleError(error: any) {
        console.error('Error:', error);
        throw error;
    }

    private getCoordinates(data: Point | Vector): Coordinates & { name: string } {
        const { data: [x, y, z], name = '' } = data;
        return { x, y, z, name };
    }

    private async callGeoApi(endpoint: string, data: any): Promise<any> {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}geometry/${endpoint}`, data);
            return JSON.parse(response.data);
        } catch (error) {
            this.handleError(error);
        }
    }

    public async createPoint(x: number, y: number, z: number, name?: string): Promise<Point> {
        return this.callGeoApi('create-point', { x, y, z, name });
    }

    public async createVector(x: number, y: number, z: number, name?: string): Promise<Vector> {
        return this.callGeoApi('create-vector', { x, y, z, name });
    }

    public async createLineDirection(point: Point, vector: Vector, length: number, name?: string): Promise<any> {
        const data = { point: this.getCoordinates(point), vector: this.getCoordinates(vector), length, name };
        console.log(this.getCoordinates(point), this.getCoordinates(vector), length, name)
        return this.callGeoApi('create-line-from-direction', data);
    }

    public async createPlaneFromPointNormal(point: Point, normal: Vector, name?: string): Promise<any> {
        const data = { point: this.getCoordinates(point), normal: this.getCoordinates(normal), name };
        return this.callGeoApi('create-plane-from-point-normal', data);
    }
}

export default new GeometryAPI();