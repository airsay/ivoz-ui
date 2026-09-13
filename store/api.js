var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { action, computed, thunk, } from 'easy-peasy';
import ApiClient from '../services/api/ApiClient';
const isReqUnauthorized = (error) => {
    if ([401].includes((error === null || error === void 0 ? void 0 : error.status) || -1)) {
        return true;
    }
    return false;
};
const handleApiErrors = (error, getStoreActions) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (!error) {
        return null;
    }
    if (isReqUnauthorized(error)) {
        const actions = getStoreActions();
        yield actions.auth.resetToken();
        yield actions.auth.useRefreshToken();
    }
    return ((_a = error.data) === null || _a === void 0 ? void 0 : _a.detail) || ((_b = error.data) === null || _b === void 0 ? void 0 : _b.message) || error.statusText;
});
const api = {
    errorMsg: null,
    errorCode: null,
    ongoingRequests: 0,
    reqCancelTokenSourceFactory: () => {
        return axios.CancelToken.source();
    },
    loading: computed((state) => {
        return state.ongoingRequests > 0;
    }),
    setErrorMsg: action((state, errorMsg) => {
        state.errorMsg = errorMsg;
    }),
    setErrorCode: action((state, errorCode) => {
        state.errorCode = errorCode;
    }),
    sumRequest: action((state) => {
        state.ongoingRequests += 1;
    }),
    restRequest: action((state) => {
        state.ongoingRequests = Math.max(state.ongoingRequests - 1, 0);
    }),
    ////////////////////////////////////////
    // GET
    ////////////////////////////////////////
    get: thunk((actions, payload, { getStoreActions, getStoreState }) => __awaiter(void 0, void 0, void 0, function* () {
        actions.sumRequest();
        actions.setErrorMsg(null);
        actions.setErrorCode(null);
        const { path, params, successCallback, cancelToken, silenceErrors, handleErrors, } = payload;
        const request = () => __awaiter(void 0, void 0, void 0, function* () {
            const resp = yield ApiClient.get(path, params, successCallback, cancelToken);
            return resp;
        });
        try {
            return yield request();
        }
        catch (error) {
            console.error(error);
            if (handleErrors === false) {
                throw error;
            }
            const errorMsg = yield handleApiErrors(error, getStoreActions);
            const token = getStoreState().auth.token;
            const retry = isReqUnauthorized(error) && token;
            if (retry) {
                try {
                    return yield request();
                }
                catch (retryError) {
                    if (!silenceErrors) {
                        actions.setErrorMsg(errorMsg);
                        actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
                    }
                    throw error;
                }
            }
            if (!silenceErrors) {
                actions.setErrorMsg(errorMsg);
                actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
            }
        }
        finally {
            actions.restRequest();
        }
    })),
    download: thunk((actions, payload, { getStoreActions, getStoreState }) => __awaiter(void 0, void 0, void 0, function* () {
        const { path, params, successCallback, cancelToken, silenceErrors, handleErrors, headers = {}, } = payload;
        actions.sumRequest();
        actions.setErrorMsg(null);
        actions.setErrorCode(null);
        const request = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield ApiClient.download(path, params, successCallback, cancelToken, headers);
        });
        try {
            return yield request();
        }
        catch (error) {
            if (handleErrors === false) {
                throw error;
            }
            const errorMsg = yield handleApiErrors(error, getStoreActions);
            const token = getStoreState().auth.token;
            const retry = isReqUnauthorized(error) && token;
            if (retry) {
                try {
                    return yield request();
                }
                catch (retryError) {
                    if (!silenceErrors) {
                        actions.setErrorMsg(errorMsg);
                        actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
                    }
                    throw error;
                }
            }
            if (!silenceErrors) {
                actions.setErrorMsg(errorMsg);
                actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
            }
        }
        finally {
            actions.restRequest();
        }
    })),
    ////////////////////////////////////////
    // POST
    ////////////////////////////////////////
    post: thunk((actions, payload, { getStoreActions, getStoreState }) => __awaiter(void 0, void 0, void 0, function* () {
        const { path, values, contentType, cancelToken, silenceErrors, handleErrors, } = payload;
        actions.sumRequest();
        actions.setErrorMsg(null);
        actions.setErrorCode(null);
        const request = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield ApiClient.post(path, values, contentType, cancelToken);
        });
        try {
            return yield request();
        }
        catch (error) {
            if (handleErrors === false) {
                throw error;
            }
            const errorMsg = yield handleApiErrors(error, getStoreActions);
            const token = getStoreState().auth.token;
            const retry = isReqUnauthorized(error) && token;
            if (retry) {
                try {
                    return yield request();
                }
                catch (retryError) {
                    if (!silenceErrors) {
                        actions.setErrorMsg(errorMsg);
                        actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
                    }
                    throw error;
                }
            }
            if (!silenceErrors) {
                actions.setErrorMsg(errorMsg);
                actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
            }
            else {
                throw error;
            }
        }
        finally {
            actions.restRequest();
        }
    })),
    ////////////////////////////////////////
    // PUT
    ////////////////////////////////////////
    put: thunk((actions, payload, { getStoreActions, getStoreState }) => __awaiter(void 0, void 0, void 0, function* () {
        const { path, values, cancelToken, silenceErrors, handleErrors } = payload;
        actions.sumRequest();
        actions.setErrorMsg(null);
        actions.setErrorCode(null);
        const request = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield ApiClient.put(path, values, cancelToken);
        });
        try {
            return yield request();
        }
        catch (error) {
            if (handleErrors === false) {
                throw error;
            }
            const errorMsg = yield handleApiErrors(error, getStoreActions);
            const token = getStoreState().auth.token;
            const retry = isReqUnauthorized(error) && token;
            if (retry) {
                try {
                    return yield request();
                }
                catch (retryError) {
                    if (!silenceErrors) {
                        actions.setErrorMsg(errorMsg);
                        actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
                    }
                    throw error;
                }
            }
            if (!silenceErrors) {
                actions.setErrorMsg(errorMsg);
                actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
            }
        }
        finally {
            actions.restRequest();
        }
    })),
    ////////////////////////////////////////
    // DELETE
    ////////////////////////////////////////
    delete: thunk((actions, payload, { getStoreActions, getStoreState }) => __awaiter(void 0, void 0, void 0, function* () {
        const { path, cancelToken, silenceErrors, handleErrors } = payload;
        actions.sumRequest();
        actions.setErrorMsg(null);
        actions.setErrorCode(null);
        const request = () => __awaiter(void 0, void 0, void 0, function* () {
            return yield ApiClient.delete(path, cancelToken);
        });
        try {
            return yield request();
        }
        catch (error) {
            if (handleErrors === false) {
                throw error;
            }
            const errorMsg = yield handleApiErrors(error, getStoreActions);
            const token = getStoreState().auth.token;
            const retry = isReqUnauthorized(error) && token;
            if (retry) {
                try {
                    return yield request();
                }
                catch (retryError) {
                    if (!silenceErrors) {
                        actions.setErrorMsg(errorMsg);
                        actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
                    }
                    throw error;
                }
            }
            if (!silenceErrors) {
                actions.setErrorMsg(errorMsg);
                actions.setErrorCode(error === null || error === void 0 ? void 0 : error.status);
            }
        }
        finally {
            actions.restRequest();
        }
    })),
};
export default api;
