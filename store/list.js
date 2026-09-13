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
const list = {
    reloadTimestamp: 0,
    parentRow: undefined,
    rows: [],
    customData: undefined,
    headers: {},
    fkChoices: {},
    // actions
    reload: action((state) => {
        state.reloadTimestamp = Date.now();
    }),
    setParentRow: action((state, row) => {
        state.parentRow = row;
    }),
    setRows: action((state, rows) => {
        state.rows = [...rows];
    }),
    setCustomData: action((state, customData) => {
        state.customData = customData;
    }),
    setHeaders: action((state, headers) => {
        state.headers = Object.assign({}, headers);
    }),
    setFkChoices: action((state, fkChoices) => {
        state.fkChoices = fkChoices;
    }),
    // thunks
    reset: thunk((actions) => __awaiter(void 0, void 0, void 0, function* () {
        actions.setRows([]);
        actions.setCustomData(undefined);
        actions.setHeaders({});
        actions.setFkChoices({});
    })),
};
export default list;
