import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ListItemButton, ListItemIcon, ListItemText, Tooltip, } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStoreActions } from 'store';
import { MenuListItemIcon } from './MenuListItemIcon';
export default function MenuListItem(props) {
    var _a;
    const { path, icon, text, className } = props;
    const navigate = useNavigate();
    const hideMenu = useStoreActions((actions) => actions.menu.hide);
    const currentPath = location.href;
    const baseHref = ((_a = document.querySelector('base')) === null || _a === void 0 ? void 0 : _a.href.slice(0, -1)) || '';
    const targetPath = baseHref + path;
    const selected = currentPath === targetPath || currentPath.indexOf(`${targetPath}/`) === 0;
    const href = `${process.env.BASE_URL}${path}`.replace('//', '/');
    return (_jsxs(ListItemButton, Object.assign({ component: 'a', href: href, className: className, dense: true, selected: selected, onClick: (e) => {
            e === null || e === void 0 ? void 0 : e.stopPropagation();
            e === null || e === void 0 ? void 0 : e.preventDefault();
            hideMenu();
            navigate(href, {
                state: {
                    referrer: location.pathname,
                },
            });
        } }, { children: [_jsx(ListItemIcon, { children: _jsx(Tooltip, Object.assign({ title: text, placement: 'left-end' }, { children: _jsx(MenuListItemIcon, { icon: icon }) })) }), _jsx(ListItemText, { primary: text })] })));
}
