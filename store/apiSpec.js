var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { action, thunk } from 'easy-peasy';
import ApiClient from '../services/api/ApiClient';
import ApiSpecParser from '../services/api/ApiSpecParser';
const specStore = {
    sessionStoragePrefix: 'app-',
    spec: {},
    loading: false,
    appVersion: '',
    // Actions
    setSessionStoragePrefix: action((state, prefix) => {
        state.sessionStoragePrefix = prefix;
    }),
    setSpec: action((state, spec) => {
        localStorage.setItem(`${state.sessionStoragePrefix}apiSpec`, JSON.stringify(spec));
        state.spec = new ApiSpecParser().parse(spec);
    }),
    setLoading: action((state) => {
        state.loading = true;
    }),
    unsetLoading: action((state) => {
        state.loading = false;
    }),
    setAppVersion: action((state, appVersion) => {
        localStorage.setItem(`${state.sessionStoragePrefix}appVersion`, appVersion);
        state.appVersion = appVersion;
    }),
    init: thunk(
    // callback thunk
    (actions, payload, helpers) => {
        const state = helpers.getState();
        if (state.loading) {
            return;
        }
        actions.setLoading();
        return new Promise((resolve, reject) => {
            var _a;
            const appVersion = (_a = document === null || document === void 0 ? void 0 : document.querySelector('meta[name="version-info"]')) === null || _a === void 0 ? void 0 : _a.getAttribute('content');
            const storedAppVersion = localStorage.getItem(`${state.sessionStoragePrefix}appVersion`);
            const storedSpec = localStorage.getItem(`${state.sessionStoragePrefix}apiSpec`);
            if (storedSpec && appVersion === storedAppVersion) {
                actions.setSpec(JSON.parse(storedSpec));
                actions.setAppVersion(appVersion);
                resolve(true);
                return;
            }
            ApiClient.get('/docs.json', {}, (data) => __awaiter(void 0, void 0, void 0, function* () {
                actions.setSpec(data);
                actions.setAppVersion(appVersion);
                actions.unsetLoading();
                resolve(true);
            })).catch((error) => {
                console.log('error', error);
                actions.unsetLoading();
                reject(error);
            });
        });
    }),
};
export default specStore;
