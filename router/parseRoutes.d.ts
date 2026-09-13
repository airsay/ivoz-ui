/// <reference types="react" />
import ParsedApiSpecInterface from '../services/api/ParsedApiSpecInterface';
import EntityInterface from '../entities/EntityInterface';
import { RouteMap, RouteMapItem } from './routeMapParser';
export interface EntityList {
    [name: string]: Readonly<EntityInterface>;
}
export declare type RouteSpec = {
    key: string;
    path: string;
    entity: EntityInterface;
    component: React.ComponentClass<any, any> | React.FunctionComponent<any>;
};
declare const parseRoutes: (apiSpec: ParsedApiSpecInterface, routeMap: RouteMap<RouteMapItem>) => RouteSpec[];
export default parseRoutes;
