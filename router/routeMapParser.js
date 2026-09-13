export const isSingleRowAction = (props) => {
    return props.row !== undefined;
};
export const isMultiSelectAction = (props) => {
    return (props.rows !== undefined &&
        Array.isArray(props.selectedValues));
};
export const isGlobalAction = (props) => {
    return (props.rows !== undefined &&
        !Array.isArray(props.selectedValues));
};
export const isRouteMapBlock = (property) => {
    return property.label !== undefined;
};
export const isRouteMapItem = (property) => {
    return property.label === undefined;
};
export const isEntityItem = (property) => {
    return property.entity !== undefined;
};
export const isActionItem = (property) => {
    return property.action !== undefined;
};
export const isSingleRowActionItem = (property, action) => {
    if (!isActionItem(property)) {
        return false;
    }
    return property.rowAction === true || property.rowAction === undefined;
};
const RouteMapItemParser = (item, routPrefix = '', depth = 1) => {
    var _a, _b, _c;
    if (isActionItem(item)) {
        return item;
    }
    if (!isEntityItem(item)) {
        throw 'unknown item type';
    }
    if (item.children && item.children.length) {
        const children = (_a = item.children) === null || _a === void 0 ? void 0 : _a.map((subitem) => {
            if (isActionItem(subitem)) {
                return subitem;
            }
            const entity = item.entity;
            const path = entity.localPath || entity.path;
            return RouteMapItemParser(subitem, `${routPrefix}${path}/:parent_id_${depth}`, depth + 1);
        });
        item = Object.assign(Object.assign({}, item), { children });
    }
    const path = ((_b = item.entity) === null || _b === void 0 ? void 0 : _b.localPath) || ((_c = item.entity) === null || _c === void 0 ? void 0 : _c.path);
    return Object.assign(Object.assign({}, item), { route: routPrefix + path });
};
const routeMapParser = (map) => {
    const resp = map.map((block) => {
        var _a;
        let children = [];
        if (isRouteMapBlock(block)) {
            children = (_a = block.children) === null || _a === void 0 ? void 0 : _a.map((item) => {
                return RouteMapItemParser(item);
            });
            return Object.assign(Object.assign({}, block), { children });
        }
        if (isEntityItem(block)) {
            return RouteMapItemParser(block);
        }
        return block;
    });
    return resp;
};
export default routeMapParser;
