import { CancelToken } from 'axios';
import { FetchFksCallback } from '../entities/EntityInterface';
export declare type fetchAllPagesProps = {
    endpoint: string;
    params: Record<string, unknown>;
    setter: FetchFksCallback;
    cancelToken?: CancelToken;
};
export declare const fetchAllPages: (props: fetchAllPagesProps) => Promise<unknown>;
