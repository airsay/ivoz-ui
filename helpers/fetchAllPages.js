var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StoreContainer } from '../store';
export const fetchAllPages = (props) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { endpoint, params, setter, cancelToken } = props;
    const getAction = StoreContainer.store.getActions().api.get;
    let keepGoing = true;
    let _page = parseInt(((_a = endpoint.match(/_page=([0-9]+)/)) === null || _a === void 0 ? void 0 : _a[1]) || '1', 10);
    const response = [];
    while (keepGoing) {
        try {
            const result = yield getAction({
                path: endpoint,
                silenceErrors: false,
                params: Object.assign(Object.assign({ _itemsPerPage: 200 }, params), { _page }),
                successCallback: (data, headers) => __awaiter(void 0, void 0, void 0, function* () {
                    response.push(...data);
                    const totalItems = parseInt((headers === null || headers === void 0 ? void 0 : headers['x-total-items']) || `${response.length}`, 10);
                    const totalPages = parseInt((headers === null || headers === void 0 ? void 0 : headers['x-total-pages']) || '1', 10);
                    const isLastPage = _page >= totalPages;
                    const hasAllItems = response.length >= totalItems;
                    const isEmptyResponse = !data.length;
                    if (isLastPage || hasAllItems || isEmptyResponse) {
                        keepGoing = false;
                    }
                    _page++;
                }),
                cancelToken,
            });
            if (!result) {
                // Cancel token or 403
                break;
            }
        }
        catch (error) {
            console.error(error);
            break;
        }
    }
    setter(response);
    return response;
});
