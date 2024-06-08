import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const API_URL = process.env.API_URL;

if (!API_URL) {
    throw new Error('Missing API_URL environment variable');
}

type Point = {
    dtype: string;
    data: [number, number, number];
    guid: string;
}

type ResponseData = {
    point: Point;
}

export async function createPoint(x: number, y: number, z: number): Promise<Point> {
    const point = { x, y, z };

    try {
        const response = await axios.post(`${API_URL}/geometry/create-point`, point);

        return response.data.point;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}