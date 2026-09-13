import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, MenuItem, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import { useStoreActions } from 'store';
import { StyledMenu } from '../Settings/styles/Menu.styles';
import _ from '../../../../services/translations/translate';
import { useStoreState } from 'store';
const parseJwt = (token) => {
    var _a, _b;
    if (!token) {
        return {
            username: 'unknown',
        };
    }
    const base64Url = (_a = token.split('.')) === null || _a === void 0 ? void 0 : _a[1];
    const base64 = (_b = base64Url === null || base64Url === void 0 ? void 0 : base64Url.replace(/-/g, '+')) === null || _b === void 0 ? void 0 : _b.replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window
        .atob(base64)
        .split('')
        .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    })
        .join(''));
    return JSON.parse(jsonPayload);
};
export default function Avatar(props) {
    const { children, className } = props;
    const resetAuth = useStoreActions((actions) => actions.auth.resetAll);
    const token = useStoreState((state) => state.auth.token);
    const tokenPayload = parseJwt(token);
    const username = tokenPayload.username;
    const handleLogout = () => {
        resetAuth();
    };
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (_jsxs("div", Object.assign({ className: className }, { children: [_jsx(Tooltip, Object.assign({ title: _('{{username}} account settings', { username }) }, { children: _jsx(Box, Object.assign({ onClick: handleOpenUserMenu, className: 'account' }, { children: username.substring(0, 2).toUpperCase() })) })), _jsx(StyledMenu, Object.assign({ anchorEl: anchorElUser, anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, keepMounted: true, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                }, open: Boolean(anchorElUser), onClose: handleCloseUserMenu }, { children: children || (_jsx(MenuItem, Object.assign({ onClick: handleLogout }, { children: _jsx(Typography, Object.assign({ textAlign: 'center' }, { children: _('Logout') })) }), 'logout')) }))] })));
}
