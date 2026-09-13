import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Dialog, DialogActions, DialogContent, MenuItem, Typography, useMediaQuery, useTheme, } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LightButton, SolidButton, } from '../../../components/shared/Button/Button.styles';
import { useStoreActions, useStoreState } from '../../../store';
import Avatar from './Avatar';
import Breadcrumbs from './Breadcrumbs';
import Settings from './Settings/Settings';
import _ from '../../../services/translations/translate';
import { useState } from 'react';
import Logo from '../Menu/Logo';
export default function Header(props) {
    const { routeMap, className } = props;
    const [open, setOpen] = useState(false);
    const resetAuth = useStoreActions((actions) => actions.auth.resetAll);
    const toggleVisibility = useStoreActions((actions) => actions.menu.toggleVisibility);
    const logo = useStoreState((state) => state.theme.logo);
    const version = useStoreState((state) => state.aboutInfo.version);
    const lastUpdated = useStoreState((state) => state.aboutInfo.lastUpdated);
    const commit = useStoreState((state) => state.aboutInfo.commit);
    const handleLogout = () => {
        resetAuth();
    };
    const theme = useTheme();
    const desktop = useMediaQuery(theme.breakpoints.up('md'));
    const handleModal = () => {
        setOpen(!open);
    };
    return (_jsxs(Box, Object.assign({ className: className }, { children: [_jsx(Box, Object.assign({ className: 'start' }, { children: _jsx(Breadcrumbs, { desktop: desktop, routeMap: routeMap }) })), _jsxs(Box, Object.assign({ className: 'end' }, { children: [desktop && (_jsxs(_Fragment, { children: [_jsx(Settings, {}), _jsxs(Avatar, { children: [_jsx(MenuItem, Object.assign({ onClick: handleModal }, { children: _jsx(Typography, Object.assign({ textAlign: 'center' }, { children: _('About') })) }), 'about'), _jsx(MenuItem, Object.assign({ onClick: handleLogout }, { children: _jsx(Typography, Object.assign({ textAlign: 'center' }, { children: _('Logout') })) }), 'logout')] })] })), !desktop && (_jsx(LightButton, Object.assign({ onClick: () => {
                            toggleVisibility();
                        } }, { children: _jsx(MenuIcon, {}) }))), open && (_jsxs(Dialog, Object.assign({ open: open, onClose: handleModal, keepMounted: true, "aria-labelledby": 'dialog-about', "aria-describedby": 'dialog-about' }, { children: [_jsx(CloseRoundedIcon, { className: 'close-icon', onClick: handleModal }), _jsxs(DialogContent, Object.assign({ className: 'dialog-about' }, { children: [_jsx("img", { src: logo || './logo.svg', className: 'logo' }), _jsxs("p", { children: [_('Version'), ": ", version, " (", commit, ") ", _jsx("br", {}), _('Last update'), ": ", lastUpdated] }), _jsxs(Box, Object.assign({ sx: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: 1,
                                        }, className: 'logo' }, { children: ["Powered by ", _jsx(Logo, {})] })), _jsx("p", { children: "\u00A92026 Axion Communications Platform | All rights reserved" })] })), _jsx(DialogActions, { children: _jsx(SolidButton, Object.assign({ onClick: handleModal, sx: { width: '100%' } }, { children: _('ACCEPT') })) })] })))] }))] })));
}
