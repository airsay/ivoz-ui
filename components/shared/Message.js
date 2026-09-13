import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import IconButton from '@mui/material/IconButton';
import { StyledCloseIcon, StyledSnackbarContentMessageContainer, } from './Message.styles';
export default function Message(props) {
    const { message, Icon } = props;
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };
    return (_jsx(Snackbar, Object.assign({ anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
        }, open: open, autoHideDuration: 5000, onClose: handleClose }, { children: _jsx(SnackbarContent, { message: _jsxs(StyledSnackbarContentMessageContainer, { children: [_jsx(Icon, {}), "\u00A0", message] }), action: [
                _jsx(IconButton, Object.assign({ "aria-label": 'close', color: 'inherit', onClick: handleClose }, { children: _jsx(StyledCloseIcon, {}) }), 'close'),
            ] }) })));
}
