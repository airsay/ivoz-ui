import { jsx as _jsx } from "react/jsx-runtime";
import Drawer from '@mui/material/Drawer';
import { StyledFilterBoxContent } from './FilterBoxContent.styles';
export default function FilterDrawer(props) {
    const { open, close: handleClose, apply, children } = props;
    return (_jsx(Drawer, Object.assign({ anchor: 'right', open: open, onClose: handleClose }, { children: _jsx(StyledFilterBoxContent, Object.assign({ close: handleClose, apply: apply }, { children: children })) })));
}
