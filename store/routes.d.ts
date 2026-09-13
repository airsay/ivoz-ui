import { Action } from 'easy-peasy';
import { RouteObject } from 'react-router-dom';
interface RoutesState {
    routes: RouteObject[];
}
interface RoutesActions {
    setRoutes: Action<RoutesState, RouteObject[]>;
}
export declare type RoutesStore = RoutesState & RoutesActions;
declare const routes: RoutesStore;
export default routes;
