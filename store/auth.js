var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, computed, thunk } from 'easy-peasy';
import ApiClient from '../services/api/ApiClient';
const auth = {
    sessionStoragePrefix: 'app-',
    loggedIn: computed((state) => {
        return state.token !== null || state.refreshToken !== null;
    }),
    login: {
        path: '/admin_login',
        refreshPath: '/token/refresh',
        exchangePath: '/token/exchange',
        contentType: 'application/x-www-form-urlencoded',
    },
    token: null,
    refreshToken: null,
    // actions
    setSessionStoragePrefix: action((state, prefix) => {
        state.sessionStoragePrefix = prefix;
    }),
    setLoginProps: action((state, loginProps) => {
        state.login = Object.assign(Object.assign({}, state.login), loginProps);
    }),
    setToken: action((state, token) => {
        if (token) {
            localStorage.setItem(`${state.sessionStoragePrefix}token`, token);
            ApiClient.setToken(token);
        }
        else {
            localStorage.removeItem(`${state.sessionStoragePrefix}token`);
        }
        state.token = token;
    }),
    setRefreshToken: action((state, refreshToken) => {
        if (refreshToken) {
            localStorage.setItem(`${state.sessionStoragePrefix}refreshToken`, refreshToken);
        }
        else {
            localStorage.removeItem(`${state.sessionStoragePrefix}refreshToken`);
        }
        state.refreshToken = refreshToken;
    }),
    // thunks
    init: thunk((actions, undefinned, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const sessionStoragePrefix = getState().sessionStoragePrefix;
        actions.setToken(localStorage.getItem(`${sessionStoragePrefix}token`));
        actions.setRefreshToken(localStorage.getItem(`${sessionStoragePrefix}refreshToken`));
    })),
    submit: thunk((actions, values, { getStoreActions, getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const apiPost = getStoreActions().api.post;
        const response = yield apiPost({
            path: getState().login.path,
            values,
            contentType: getState().login.contentType,
        });
        if (response.data && response.data.token) {
            actions.setToken(response.data.token);
            actions.setRefreshToken(response.data.refresh_token);
            return true;
        }
        return false;
    })),
    useRefreshToken: thunk((actions, undefinned, { getStoreActions, getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const apiPost = getStoreActions().api.post;
        const refresh_token = getState().refreshToken;
        if (!refresh_token) {
            return false;
        }
        const payload = {
            refresh_token,
        };
        try {
            const response = yield apiPost({
                path: getState().login.refreshPath,
                values: payload,
                contentType: getState().login.contentType,
                handleErrors: false,
            });
            if (response.data && response.data.token) {
                actions.setToken(response.data.token);
                return true;
            }
        }
        catch (error) {
            actions.resetRefreshToken();
            console.error(error);
            return false;
        }
        return false;
    })),
    resetAll: thunk((actions) => __awaiter(void 0, void 0, void 0, function* () {
        actions.resetToken();
        actions.resetRefreshToken();
    })),
    resetToken: thunk((actions, undefinned, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const sessionStoragePrefix = getState().sessionStoragePrefix;
        localStorage.removeItem(`${sessionStoragePrefix}token`);
        actions.setToken(null);
    })),
    resetRefreshToken: thunk((actions, undefinned, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const sessionStoragePrefix = getState().sessionStoragePrefix;
        localStorage.removeItem(`${sessionStoragePrefix}refreshToken`);
        actions.setRefreshToken(null);
    })),
    exchangeToken: thunk((actions, values, { getStoreActions, getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const apiPost = getStoreActions().api.post;
        const response = yield apiPost({
            path: getState().login.exchangePath,
            values,
            contentType: getState().login.contentType,
        });
        if (response.data && response.data.token) {
            actions.setToken(response.data.token);
            actions.setRefreshToken(null);
            return true;
        }
        return false;
    })),
};
export default auth;
