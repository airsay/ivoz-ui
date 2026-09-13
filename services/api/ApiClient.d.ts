import { AxiosResponse, CancelToken } from 'axios';
import { KeyValList } from './ParsedApiSpecInterface';
declare type AsyncFunction = (data: any, headers: any) => Promise<void>;
export declare type ApiError = AxiosResponse | null;
declare class ApiClient {
    static API_URL: string;
    static setToken(token: string): void;
    /**
     * Returns undefined on cancel token or 403
     */
    static get(endpoint: string, params: KeyValList, callback: AsyncFunction, cancelToken?: CancelToken): Promise<AxiosResponse<any> | undefined>;
    static download(endpoint: string, params: any, callback: AsyncFunction, cancelToken?: CancelToken, headers?: Record<string, string>): Promise<unknown>;
    static post<T = any>(endpoint: string, params: any, contentType: string, cancelToken?: CancelToken): Promise<T | undefined>;
    static put<T = any>(endpoint: string, params?: any, cancelToken?: CancelToken): Promise<T | undefined>;
    static delete<T = any>(endpoint: string, cancelToken?: CancelToken): Promise<T | undefined>;
}
export default ApiClient;
