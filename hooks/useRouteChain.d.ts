import { PathMatch } from 'react-router-dom';
import { EntityItem, RouteMap } from '../router';
declare type useRouteChainProps = {
    routeMap: RouteMap;
    match: PathMatch;
};
declare const useRouteChain: (props: useRouteChainProps) => Array<EntityItem>;
export default useRouteChain;
