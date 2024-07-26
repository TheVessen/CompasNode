import axios, { AxiosError, type AxiosInstance } from 'axios';

export default abstract class BaseAPI {
    protected static axiosInstance: AxiosInstance;
    protected static basePath: string;
    protected static loggingEnabled: boolean = false;

    /**
     * The base URL of the API server.
     */
    public static set host(value: string) {
        if (value === "") {
            throw new Error('Host address cannot be empty');
        }
        this.axiosInstance = axios.create({
            baseURL: value,
            headers: {
                'Authorization': `Bearer ${this.apiKey}`,
                'Content-Type': 'application/json',
            },
        });
    }

    /**
     * Sets the API key used for authorization.
     * @param value - The API key value.
     */
    public static set apiKey(value: string) {

        this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${value}`;
    }

    /**
     * Enables or disables logging for the API.
     * @param value - A boolean value indicating whether logging should be enabled or disabled.
     */
    public static set logging(value: boolean) {
        this.loggingEnabled = value;
    }

    /**
     * Handles the error thrown by Axios during API requests.
     * If the error has a response, it logs the response data.
     * If the error does not have a response, it logs the request data.
     * Finally, it rethrows the error.
     * 
     * @param error - The Axios error object.
     */
    protected static handleError(error: AxiosError): void {
        if (error.response) {
            console.error('Response error details:', error.response.data);
        } else if (error.request) {
            console.error('Request data:', error.request);
        }
        throw error;
    }

    /**
     * Makes an API call to the specified endpoint.
     * @param subPath - The subpath of the API endpoint.
     * @param endpoint - The endpoint to call.
     * @param data - The data to send with the API call.
     * @returns A Promise that resolves to the response data from the API call.
     */
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

    /**
     * Calls the API endpoint and parses the response.
     * 
     * @param subPath - The subpath of the API endpoint.
     * @param endpoint - The endpoint of the API.
     * @param data - The data to be sent with the API request.
     * @returns A Promise that resolves to the parsed response from the API.
     */
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

