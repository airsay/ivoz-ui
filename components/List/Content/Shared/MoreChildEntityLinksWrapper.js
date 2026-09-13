import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React from 'react';
import { LightButton } from '../../../../components/shared/Button/Button.styles';
import { StyledMenu } from '../../../shared/Menu/Menu.styles';
export const MoreChildEntityLinksWrapper = (props) => {
    const { children, disabled = false } = props;
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (_jsxs(_Fragment, { children: [_jsx(LightButton, Object.assign({ onClick: handleClick, disabled: disabled }, { children: _jsx(MoreHorizIcon, {}) })), _jsx(StyledMenu, Object.assign({ anchorEl: anchorEl, open: open, onClose: handleClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                } }, { children: children }))] }));
};
