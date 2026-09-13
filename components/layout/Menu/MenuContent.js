import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useStoreState } from 'store';
import { Fragment } from 'react';
import { isActionItem, isEntityItem, } from '../../../router/routeMapParser';
import { StyledDivider, StyledHomeIcon, StyledMenuList, } from './MenuContent.styles';
import MenuBlock from './MenuBlock';
import MenuHeader from './MenuHeader';
import MenuListItem from './MenuListItem';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Logo from './Logo';
export default function MenuContent(props) {
    const { routeMap } = props;
    let menuVariant = useStoreState((state) => state.menu.variant);
    const desktop = useMediaQuery(useTheme().breakpoints.up('md'));
    if (!desktop) {
        menuVariant = 'expanded';
    }
    return (_jsxs(StyledMenuList, Object.assign({ className: `sidemenu ${menuVariant}` }, { children: [_jsx(MenuHeader, {}), _jsxs(Box, Object.assign({ className: 'link-container' }, { children: [_jsx(MenuListItem, { path: '/', icon: _jsx(StyledHomeIcon, {}), text: 'Dashboard' }), routeMap.map((routeMapBlock, key) => {
                        if (isActionItem(routeMapBlock)) {
                            return null;
                        }
                        if (isEntityItem(routeMapBlock)) {
                            const entity = routeMapBlock.entity;
                            const divider = routeMapBlock.divider;
                            return (_jsxs(Fragment, { children: [divider && _jsx(StyledDivider, {}), _jsx(MenuListItem, { path: entity.localPath || entity.path, icon: _jsx(entity.icon, {}), text: entity.title }, key)] }, key));
                        }
                        return (_jsxs(Fragment, { children: [_jsx(StyledDivider, {}), _jsx("div", { children: _jsx(MenuBlock, { idx: key, routeMapBlock: routeMapBlock }) })] }, key));
                    })] })), _jsx(Box, Object.assign({ className: 'logo' }, { children: _jsx(Logo, {}) }))] })));
}
