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
class ApiClient {
    static setToken(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    /**
     * Returns undefined on cancel token or 403
     */
    static get(endpoint, params, callback, cancelToken) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(ApiClient.API_URL + endpoint, {
                    params,
                    headers: {
                        Accept: 'application/json',
                    },
                    cancelToken,
                });
                yield callback(response.data, response.headers);
                return response;
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    return undefined;
                }
                if (!error) {
                    throw error;
                }
                const axiosError = error;
                if (((_a = axiosError === null || axiosError === void 0 ? void 0 : axiosError.response) === null || _a === void 0 ? void 0 : _a.status) === 403) {
                    yield callback([], axiosError.response.headers);
                    return undefined;
                }
                throw axiosError.response;
            }
        });
    }
    static download(endpoint, params = undefined, callback, cancelToken, headers) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield axios.get(ApiClient.API_URL + endpoint, {
                    params: params,
                    headers: headers || {},
                    responseType: 'blob',
                    cancelToken,
                });
                yield callback(response.data, response.headers);
                return response;
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                if (!error) {
                    throw error;
                }
                const axiosError = error;
                if (((_a = axiosError === null || axiosError === void 0 ? void 0 : axiosError.response) === null || _a === void 0 ? void 0 : _a.status) === 403) {
                    yield callback([], axiosError.response.headers);
                    return;
                }
                throw axiosError.response;
            }
        });
    }
    static post(endpoint, params = undefined, contentType, cancelToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const reqConfig = {
                headers: {
                    'Content-Type': contentType,
                },
                cancelToken,
            };
            if (contentType === 'application/x-www-form-urlencoded') {
                const reqParams = new URLSearchParams();
                for (const idx in params) {
                    reqParams.append(idx, params[idx]);
                }
                params = reqParams;
            }
            try {
                return yield axios.post(ApiClient.API_URL + endpoint, params, reqConfig);
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                if (!error) {
                    throw error;
                }
                throw error.response;
            }
        });
    }
    static put(endpoint, params = undefined, cancelToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield axios.put(ApiClient.API_URL + endpoint, params, {
                    cancelToken,
                });
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                if (!error) {
                    throw error;
                }
                throw error.response;
            }
        });
    }
    static delete(endpoint, cancelToken) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield axios.delete(ApiClient.API_URL + endpoint, {
                    cancelToken,
                });
            }
            catch (error) {
                if (axios.isCancel(error)) {
                    return;
                }
                if (!error) {
                    throw error;
                }
                throw error.response;
            }
        });
    }
}
ApiClient.API_URL = `//${window.location.host}/api`;
export default ApiClient;
