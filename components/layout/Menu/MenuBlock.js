import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, } from '@mui/material';
import { GearIcon } from '../../../icons/GearIcon';
import { useEffect } from 'react';
import { useStoreActions, useStoreState } from 'store';
import { isActionItem, isEntityItem, } from '../../../router/routeMapParser';
import MenuListItem from './MenuListItem';
export default function MenuBlock(props) {
    const { routeMapBlock, idx } = props;
    const selectedIdx = useStoreState((store) => store.menu.selected);
    const open = selectedIdx === idx;
    const collapseMenu = useStoreActions((actions) => actions.menu.collapse);
    const expandMenu = useStoreActions((actions) => actions.menu.expand);
    const { label, children, icon: CustomIcon } = routeMapBlock;
    const selectedChild = (children || []).find((item) => {
        var _a;
        if (!isEntityItem(item)) {
            return false;
        }
        const route = item.route;
        const currentPath = location.href;
        const baseHref = ((_a = document.querySelector('base')) === null || _a === void 0 ? void 0 : _a.href.slice(0, -1)) || '';
        const targetPath = baseHref + route;
        const match = currentPath === targetPath || currentPath.indexOf(`${targetPath}/`) === 0;
        return match;
    });
    useEffect(() => {
        if (selectedChild) {
            expandMenu(idx);
        }
    }, []);
    if (isEntityItem(routeMapBlock)) {
        const entity = routeMapBlock.entity;
        return (_jsx(MenuListItem, { path: entity.path, icon: _jsx(entity.icon, {}), text: entity.title }));
    }
    const handleClick = () => {
        if (open) {
            collapseMenu();
        }
        else {
            expandMenu(idx);
        }
    };
    let selected = false;
    for (const item of children) {
        if (isActionItem(item)) {
            continue;
        }
        const path = item.route;
        selected =
            location.pathname === path || location.pathname.indexOf(`${path}/`) === 0;
        if (selected) {
            break;
        }
    }
    return (_jsxs(_Fragment, { children: [_jsxs(ListItemButton, Object.assign({ selected: selected, onClick: handleClick }, { children: [_jsx(ListItemIcon, { children: CustomIcon ? _jsx(CustomIcon, {}) : _jsx(GearIcon, {}) }), _jsx(ListItemText, { primary: label })] })), _jsx(Collapse, Object.assign({ in: open, timeout: 'auto', unmountOnExit: true }, { children: _jsx(List, Object.assign({ component: 'div', disablePadding: true }, { children: children.map((item, key) => {
                        if (isActionItem(item)) {
                            return null;
                        }
                        const { route, entity } = item;
                        if (!entity) {
                            return null;
                        }
                        if (!route) {
                            return null;
                        }
                        return (_jsx(MenuListItem, { path: route, icon: _jsx(entity.icon, {}), text: entity.title }, key));
                    }) })) }))] }));
}
