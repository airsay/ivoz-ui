import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Chip, styled } from '@mui/material';
import { forwardRef } from 'react';
const _Chip = forwardRef((props, ref) => {
    const { className, icon, label, onDelete } = props;
    return (_jsx(Chip, { icon: icon, label: label, onDelete: onDelete, className: className, ref: ref }));
});
_Chip.displayName = '_Chip';
export const StyledChip = _Chip;
const _ChipIcon = (props) => {
    const { children, className, fieldName } = props;
    return (_jsxs("div", Object.assign({ className: className }, { children: [_jsx("span", Object.assign({ className: 'prefix' }, { children: fieldName })), children] })));
};
export const StyledChipIcon = styled(_ChipIcon)(() => {
    return {
        paddingLeft: '5px',
        '& .prefix': {
            display: 'inline-flex',
            paddingRight: '10px',
        },
    };
});
