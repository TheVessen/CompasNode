// src/api/baseAPI.ts
import axios, { AxiosError, type AxiosInstance } from 'axios';

export default abstract class BaseAPI {
    protected static axiosInstance: AxiosInstance;
    protected static basePath: string;
    protected static loggingEnabled: boolean = false;

    public static set host(value: string) {
        this.axiosInstance = axios.create({
            baseURL: value,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    public static set apiKey(value: string) {
        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${value}`;
    }

    public static set logging(value: boolean) {
        this.loggingEnabled = value;
    }

    protected static handleError(error: AxiosError): void {
        if (error.response) {
            console.error('Response error details:', error.response.data);
        } else if (error.request) {
            console.error('Request data:', error.request);
        }
        throw error;
    }

    protected static async callApi(subPath: string, endpoint: string, data: any): Promise<any> {
        try {
            const startTime = Date.now();
            const response = await this.axiosInstance.post(`${subPath}/${endpoint}`, data);
            const endTime = Date.now();
            if (this.loggingEnabled) {
                console.log(`API call to ${subPath}/${endpoint} took ${endTime - startTime} ms`);
            }
            return response.data;
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }

    protected static async callApiAndParse(subPath: string, endpoint: string, data: any): Promise<any> {
        try {
            const startTime = Date.now();
            const response = await this.axiosInstance.post(`${subPath}/${endpoint}`, data);
            const endTime = Date.now();
            if (this.loggingEnabled) {
                console.log(`API call to ${subPath}/${endpoint} took ${endTime - startTime} ms`);
            }
            return JSON.parse(response.data);
        } catch (error) {
            this.handleError(error as AxiosError);
        }
    }

}

