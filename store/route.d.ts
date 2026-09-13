import { Action, Computed, Thunk } from 'easy-peasy';
import { CriteriaFilterValues, CriteriaFilterValue } from '../components/List/Filter/ContentFilterDialog';
declare type DirectionType = 'asc' | 'desc';
export interface RouteOrderState {
    name: string;
    direction: DirectionType;
}
interface RouteState {
    queryStringCriteria: CriteriaFilterValues;
    order: Computed<RouteState, RouteOrderState | null>;
    defaultItemsPerPage: number;
    itemsPerPage: Computed<RouteState, number>;
    page: Computed<RouteState, number>;
}
interface RouteActions {
    setQueryStringCriteria: Action<RouteState, CriteriaFilterValues>;
    replaceInQueryStringCriteria: Thunk<RouteStore, CriteriaFilterValue, unknown>;
}
export declare type RouteStore = RouteState & RouteActions;
export declare const ROUTE_ORDER_KEY = "_order";
export declare const ROUTE_ITEMS_PER_PAGE_KEY = "_itemsPerPage";
export declare const ROUTE_PAGE_KEY = "_page";
declare const route: RouteStore;
export default route;
