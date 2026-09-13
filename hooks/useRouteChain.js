import { filterRouteMapPath, isActionItem, } from '../router';
const useRouteChain = (props) => {
    var _a, _b;
    const { routeMap, match } = props;
    const filteredRouteMapPath = filterRouteMapPath(routeMap, match);
    const routeItems = (filteredRouteMapPath === null || filteredRouteMapPath === void 0 ? void 0 : filteredRouteMapPath.entity)
        ? [
            {
                entity: filteredRouteMapPath.entity,
                route: filteredRouteMapPath.route,
            },
        ]
        : [];
    let child = (_a = filteredRouteMapPath === null || filteredRouteMapPath === void 0 ? void 0 : filteredRouteMapPath.children) === null || _a === void 0 ? void 0 : _a[0];
    while (child) {
        if (isActionItem(child)) {
            break;
        }
        routeItems.push({ entity: child.entity, route: child.route });
        child = (_b = child.children) === null || _b === void 0 ? void 0 : _b[0];
    }
    return routeItems;
};
export default useRouteChain;
