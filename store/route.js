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
export const ROUTE_ORDER_KEY = '_order';
export const ROUTE_ITEMS_PER_PAGE_KEY = '_itemsPerPage';
export const ROUTE_PAGE_KEY = '_page';
const route = {
    queryStringCriteria: [],
    defaultItemsPerPage: 25,
    order: computed((state) => {
        for (const criteria of state.queryStringCriteria) {
            if (criteria.name === ROUTE_ORDER_KEY) {
                const order = {
                    name: criteria.type,
                    direction: criteria.value,
                };
                return order;
            }
        }
        return null;
    }),
    itemsPerPage: computed((state) => {
        for (const criteria of state.queryStringCriteria) {
            if (criteria.name === ROUTE_ITEMS_PER_PAGE_KEY) {
                return parseInt(criteria.value, 10);
            }
        }
        return state.defaultItemsPerPage;
    }),
    page: computed((state) => {
        for (const criteria of state.queryStringCriteria) {
            if (criteria.name === ROUTE_PAGE_KEY) {
                return parseInt(criteria.value, 10);
            }
        }
        return 1;
    }),
    // actions
    setQueryStringCriteria: action((state, queryStringCriteria) => {
        state.queryStringCriteria = [...queryStringCriteria];
    }),
    // thunks
    replaceInQueryStringCriteria: thunk((actions, criteria, { getState }) => __awaiter(void 0, void 0, void 0, function* () {
        const queryStringCriteria = [...getState().queryStringCriteria];
        let replaced = false;
        for (const idx in queryStringCriteria) {
            if (queryStringCriteria[idx].name !== criteria.name) {
                continue;
            }
            queryStringCriteria[idx] = criteria;
            replaced = true;
            break;
        }
        if (!replaced) {
            queryStringCriteria.push(criteria);
        }
        actions.setQueryStringCriteria(queryStringCriteria);
    })),
};
export default route;
