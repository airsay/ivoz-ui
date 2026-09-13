import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { Button, IconButton, Slide, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import _ from '../../../services/translations/translate';
import { StyledToolbar } from './FilterBoxContent.styles';
const Transition = React.forwardRef((props, ref) => {
    return _jsx(Slide, Object.assign({ direction: 'up', ref: ref }, props));
});
Transition.displayName = 'FilterDialogTransition';
export default function FilterBoxContent(props) {
    const { close, apply, className } = props;
    const applyImmediately = () => {
        apply(false);
    };
    return (_jsxs("div", Object.assign({ className: className }, { children: [_jsxs(StyledToolbar, { children: [_jsx(IconButton, Object.assign({ edge: 'start', color: 'inherit', onClick: close, "aria-label": 'close' }, { children: _jsx(Tooltip, Object.assign({ title: _('Close'), arrow: true, placement: 'right', enterTouchDelay: 0 }, { children: _jsx(CloseIcon, {}) })) })), _jsx(Button, Object.assign({ autoFocus: true, color: 'inherit', onClick: applyImmediately }, { children: _('Apply') }))] }), props.children] })));
}
