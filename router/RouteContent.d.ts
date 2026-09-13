/// <reference types="react" />
import ParsedApiSpecInterface from '../services/api/ParsedApiSpecInterface';
import { RouteSpec } from './parseRoutes';
import { RouteMap } from './routeMapParser';
export interface RouteContentProps {
    route: RouteSpec;
    apiSpec: ParsedApiSpecInterface;
    routeMap: RouteMap;
}
declare const RouteContent: (props: RouteContentProps) => JSX.Element;
export default RouteContent;
