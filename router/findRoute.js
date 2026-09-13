import { isActionItem, isEntityItem, isRouteMapBlock, } from './routeMapParser';
const matchRoute = (route, match, includeChildren = false) => {
    var _a, _b, _c, _d;
    const baseUrl = process.env.BASE_URL || '/';
    const routePaths = [
        baseUrl + ((_a = route.route) === null || _a === void 0 ? void 0 : _a.substring(1)),
        baseUrl + ((_b = route.route) === null || _b === void 0 ? void 0 : _b.substring(1)) + '/create',
        baseUrl + ((_c = route.route) === null || _c === void 0 ? void 0 : _c.substring(1)) + '/:id/update',
        baseUrl + ((_d = route.route) === null || _d === void 0 ? void 0 : _d.substring(1)) + '/:id/detailed',
    ];
    if (routePaths.includes(match.pattern.path)) {
        const resp = Object.assign({}, route);
        if (!includeChildren) {
            delete resp.children;
        }
        return resp;
    }
};
const _filterRoutePathItems = (route, match, includeChildren = false) => {
    if (isActionItem(route)) {
        return undefined;
    }
    if (route.children) {
        for (const child of route.children) {
            const resp = _filterRoutePathItems(child, match, includeChildren);
            if (resp) {
                return Object.assign(Object.assign({}, route), { children: [resp] });
            }
        }
    }
    return matchRoute(route, match, includeChildren);
};
export const filterRouteMapPath = (routeMap, match) => {
    for (const item of routeMap) {
        if (isRouteMapBlock(item)) {
            for (const child of item.children) {
                const resp = _filterRoutePathItems(child, match, false);
                if (resp) {
                    return resp;
                }
            }
        }
        else if (isEntityItem(item)) {
            const resp = _filterRoutePathItems(item, match, false);
            if (resp) {
                return resp;
            }
        }
    }
};
const _findRoute = (route, match) => {
    if (isActionItem(route)) {
        return undefined;
    }
    if (route.children) {
        for (const child of route.children) {
            const resp = _findRoute(child, match);
            if (resp) {
                return resp;
            }
        }
    }
    return matchRoute(route, match, true);
};
const findRoute = (routeMap, match) => {
    for (const item of routeMap) {
        if (isRouteMapBlock(item) || (isEntityItem(item) && item.children)) {
            for (const child of item.children) {
                const resp = _findRoute(child, match);
                if (resp) {
                    return resp;
                }
            }
        }
        if (isEntityItem(item)) {
            const resp = _filterRoutePathItems(item, match, true);
            if (resp) {
                return resp;
            }
        }
    }
};
export const findParentEntity = (routeMap, match) => {
    const parentPattern = match.pattern.path.split('/').slice(0, -2).join('/');
    if (!parentPattern) {
        return;
    }
    for (const item of routeMap) {
        if (isRouteMapBlock(item)) {
            for (const child of item.children) {
                const resp = _findRoute(child, Object.assign(Object.assign({}, match), { pattern: Object.assign(Object.assign({}, match.pattern), { path: parentPattern }) }));
                if (resp) {
                    return resp.entity;
                }
            }
        }
        else if (isEntityItem(item)) {
            const resp = _findRoute(item, Object.assign(Object.assign({}, match), { pattern: Object.assign(Object.assign({}, match.pattern), { path: parentPattern }) }));
            if (resp) {
                return resp.entity;
            }
        }
    }
};
export default findRoute;
