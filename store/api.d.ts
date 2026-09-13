import { CancelToken, CancelTokenSource } from 'axios';
import { Action, Computed, Thunk } from 'easy-peasy';
import { IvozStore } from '../index';
import { KeyValList } from '../services/api/ParsedApiSpecInterface';
import { EntityValues } from '../services/entity/EntityService';
interface requestParms {
    path: string;
    cancelToken?: CancelToken;
    silenceErrors?: boolean;
    handleErrors?: boolean;
}
interface apiGetRequestParams extends requestParms {
    params: KeyValList;
    headers?: Record<string, string>;
    successCallback: (data: Record<string, any> | Array<Record<string, any>> | Blob, headers: Record<string, any>) => Promise<any>;
}
interface apiPostRequestParams extends requestParms {
    values: FormData | EntityValues | Record<string, string | number | boolean | null>;
    contentType: string;
}
interface apiPutRequestParams extends requestParms {
    values: FormData | EntityValues;
}
declare type apiDeleteRequestParams = requestParms;
interface ApiState {
    errorMsg: string | null;
    errorCode: number | null;
    ongoingRequests: number;
    loading: Computed<ApiState, boolean>;
    reqCancelTokenSourceFactory: () => CancelTokenSource;
}
interface ApiActions {
    setErrorMsg: Action<ApiState, string>;
    setErrorCode: Action<ApiState, number>;
    sumRequest: Action<ApiState>;
    restRequest: Action<ApiState>;
    get: Thunk<() => Promise<void>, apiGetRequestParams, any, IvozStore>;
    download: Thunk<() => Promise<void>, apiGetRequestParams, any, IvozStore>;
    post: Thunk<() => Promise<void>, apiPostRequestParams, any, IvozStore>;
    put: Thunk<() => Promise<void>, apiPutRequestParams, any, IvozStore>;
    delete: Thunk<() => Promise<void>, apiDeleteRequestParams, any, IvozStore>;
}
export declare type ApiStore = ApiState & ApiActions;
declare const api: ApiStore;
export default api;
