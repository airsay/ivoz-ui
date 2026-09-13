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
export const fetchFilteredPage = (props) => __awaiter(void 0, void 0, void 0, function* () {
    const { endpoint, params, setter, cancelToken } = props;
    const getAction = StoreContainer.store.getActions().api.get;
    const response = [];
    try {
        yield getAction({
            path: endpoint,
            silenceErrors: false,
            params: Object.assign(Object.assign({ _itemsPerPage: 20 }, params), { _pagination: true, _page: 1 }),
            successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                response.push(...data);
            }),
            cancelToken,
        });
    }
    catch (error) {
        console.error(error);
    }
    setter(response);
    return response;
});
