import { Action, Thunk } from 'easy-peasy';
interface SpecState {
    sessionStoragePrefix: string;
    spec: any;
    loading: boolean;
    appVersion: string;
}
interface SpecActions {
    setSessionStoragePrefix: Action<SpecState, string>;
    setSpec: Action<SpecState, null>;
    setLoading: Action<SpecState>;
    unsetLoading: Action<SpecState>;
    setAppVersion: Action<SpecState, string>;
    init: Thunk<() => Promise<void>>;
}
export declare type SpecStore = SpecState & SpecActions;
declare const specStore: {
    sessionStoragePrefix: string;
    spec: {};
    loading: boolean;
    appVersion: string;
    setSessionStoragePrefix: Action<SpecState, string>;
    setSpec: Action<SpecState, any>;
    setLoading: Action<SpecState, any>;
    unsetLoading: Action<SpecState, any>;
    setAppVersion: Action<SpecState, string>;
    init: Thunk<{}, undefined, any, {}, Promise<unknown> | undefined>;
};
export default specStore;
