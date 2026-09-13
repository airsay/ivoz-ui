import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledDialogContentBody, StyledDialogContent, StyledDialogActions, } from './Modal.styles';
import { OutlinedButton, SolidButton } from '../Button/Button.styles';
import { forwardRef } from 'react';
import Slide from '@mui/material/Slide';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, Dialog, DialogContentText, DialogTitle, IconButton, } from '@mui/material';
const Transition = forwardRef(function Transition(props, ref) {
    return _jsx(Slide, Object.assign({}, props, { direction: 'up', ref: ref }));
});
export default function Modal(props) {
    const { title, description, children, sx, open, onClose, buttons, icon, keepMounted = false, } = props;
    const handleKeyDown = (event) => {
        event.stopPropagation();
    };
    const renderButton = (button, index) => {
        var _a;
        const ButtonTypeComponent = button.variant === 'outlined' ? OutlinedButton : SolidButton;
        return (_jsx(ButtonTypeComponent, Object.assign({ onClick: button.onClick, autoFocus: button.autoFocus, disabled: (_a = button.disabled) !== null && _a !== void 0 ? _a : false, sx: { flex: 1 } }, { children: button.label }), index));
    };
    return (_jsxs(Dialog, Object.assign({ open: open, onClose: onClose, TransitionComponent: Transition, "aria-labelledby": 'alert-dialog-slide-title', "aria-describedby": 'alert-dialog-slide-description', onKeyDown: handleKeyDown, keepMounted: keepMounted, maxWidth: false }, { children: [_jsx(Box, Object.assign({ sx: { position: 'absolute', right: 8, top: 8 } }, { children: _jsx(IconButton, Object.assign({ onClick: onClose }, { children: _jsx(CloseRoundedIcon, {}) })) })), icon && _jsx("img", { src: icon, className: 'modal-icon', alt: 'dialog icon' }), _jsx(DialogTitle, Object.assign({ id: 'alert-dialog-slide-title' }, { children: title })), _jsxs(StyledDialogContent, { children: [description && (_jsx(DialogContentText, Object.assign({ id: 'alert-dialog-slide-description' }, { children: description }))), _jsx(StyledDialogContentBody, Object.assign({ sx: sx }, { children: children }))] }), buttons && (_jsx(StyledDialogActions, Object.assign({ style: { padding: 0 } }, { children: buttons === null || buttons === void 0 ? void 0 : buttons.map(renderButton) })))] })));
}
