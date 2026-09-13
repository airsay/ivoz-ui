import { CancelToken } from 'axios';
import { FetchFksCallback } from '../entities/EntityInterface';
export declare type fetchFilteredPageProps = {
    endpoint: string;
    params: Record<string, unknown>;
    setter: FetchFksCallback;
    cancelToken?: CancelToken;
};
export declare const fetchFilteredPage: (props: fetchFilteredPageProps) => Promise<unknown>;
