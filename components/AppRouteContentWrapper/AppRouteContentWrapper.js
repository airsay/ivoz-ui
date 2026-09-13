import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, IconButton } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useStoreActions, useStoreState } from 'store';
import { Header, Menu } from '../layout';
import Loading from '../layout/Loading/Loading';
import { StyledCloseIcon } from '../shared/Message.styles';
export default function AppRouteContentWrapper(props) {
    const { loggedIn, routeMap, children, className } = props;
    const clearFlassMsg = useStoreActions((actions) => actions.flashMsg.clear);
    const flassMsg = useStoreState((state) => state.flashMsg.msg);
    const flassMsgType = useStoreState((state) => state.flashMsg.type);
    return (_jsxs("div", Object.assign({ className: className }, { children: [_jsx(Loading, {}), _jsxs(Box, Object.assign({ className: 'app-wrapper' }, { children: [_jsx(Menu, { routeMap: routeMap }), _jsxs(Box, Object.assign({ component: 'main' }, { children: [_jsx(Box, Object.assign({ component: 'header', className: 'breadcrumb' }, { children: loggedIn && _jsx(Header, { routeMap: routeMap }) })), flassMsg && (_jsx(MuiAlert, Object.assign({ severity: flassMsgType, action: _jsx(IconButton, Object.assign({ "aria-label": 'close', color: 'inherit', onClick: () => {
                                        clearFlassMsg();
                                    } }, { children: _jsx(StyledCloseIcon, {}) })) }, { children: flassMsg }))), _jsx(Box, Object.assign({ component: 'section' }, { children: children }))] }))] }))] })));
}
