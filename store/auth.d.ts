import { Action, Computed, Thunk } from 'easy-peasy';
interface LoginProps {
    path: string;
    refreshPath: string;
    exchangePath: string;
    contentType: string;
}
interface AuthState {
    sessionStoragePrefix: string;
    loggedIn: Computed<AuthState, boolean>;
    login: LoginProps;
    token: string | null;
    refreshToken: string | null;
}
interface AuthActions {
    setSessionStoragePrefix: Action<AuthState, string>;
    setLoginProps: Action<AuthState, Partial<LoginProps>>;
    setToken: Action<AuthState, string | null>;
    setRefreshToken: Action<AuthState, string | null>;
    init: Thunk<AuthState>;
    submit: Thunk<AuthState, Record<string, string>>;
    useRefreshToken: Thunk<AuthState>;
    resetAll: Thunk<AuthState>;
    resetToken: Thunk<AuthState>;
    resetRefreshToken: Thunk<AuthState>;
    exchangeToken: Thunk<AuthState, Record<string, string>>;
}
export declare type AuthStore = AuthActions & AuthState;
declare const auth: AuthStore;
export default auth;
