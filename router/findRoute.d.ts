import { PathMatch } from 'react-router-dom';
import EntityInterface from '../entities/EntityInterface';
import { EntityItem, RouteMap, RouteMapItem } from './routeMapParser';
export declare const filterRouteMapPath: (routeMap: RouteMap<RouteMapItem>, match: PathMatch) => EntityItem | undefined;
declare const findRoute: (routeMap: RouteMap<RouteMapItem>, match: PathMatch) => EntityItem | undefined;
export declare const findParentEntity: (routeMap: RouteMap<RouteMapItem>, match: PathMatch) => EntityInterface | undefined;
export default findRoute;
