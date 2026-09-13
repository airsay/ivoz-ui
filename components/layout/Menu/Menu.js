import { jsx as _jsx } from "react/jsx-runtime";
import { Drawer, useMediaQuery, useTheme } from '@mui/material';
import MenuContent from './MenuContent';
import { useStoreState, useStoreActions } from 'store';
export default function Menu(props) {
    const desktop = useMediaQuery(useTheme().breakpoints.up('md'));
    const hidden = useStoreState((state) => state.menu.hidden);
    const toggleVisibility = useStoreActions((actions) => actions.menu.toggleVisibility);
    if (desktop) {
        return _jsx(MenuContent, Object.assign({}, props));
    }
    return (_jsx(Drawer, Object.assign({ anchor: 'left', open: !hidden, onClose: () => {
            toggleVisibility();
        } }, { children: _jsx(MenuContent, Object.assign({}, props)) })));
}
