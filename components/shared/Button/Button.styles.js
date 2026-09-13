var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import Button from './Button';
import { styled } from '@mui/material';
const sharedCssVariables = {
    '--color': 'var(--color-primary)',
    '--colorTonal': 'var(--color-primary-tonal)',
};
const sharedButtonStyles = {
    minWidth: 'auto',
    padding: 'var(--spacing-sm)',
    height: 'fit-content',
    borderRadius: 'var(--radius-md)',
    boxSizing: 'border-box',
    textTransform: 'capitalize',
    '&.MuiButton-textError': {
        '--color': 'var(--color-danger)',
    },
    '&.MuiButton-textSecondary': {
        '--color': 'var(--color-secondary)',
        '--colorTonal': 'var(--color-secondary-tonal)',
    },
    '&:disabled': {
        background: '#edeeef',
        color: '#d1d1d3',
    },
    '& svg': {
        color: 'currentColor',
    },
};
const StyledButton = React.forwardRef((props, ref) => {
    const { children } = props, rest = __rest(props, ["children"]);
    return (_jsx(Button, Object.assign({}, rest, { ref: ref, style: sharedCssVariables }, { children: children })));
});
export const StyledColorPickerButton = React.forwardRef((props, ref) => {
    const { children, style } = props, rest = __rest(props, ["children", "style"]);
    return (_jsx(Button, Object.assign({}, rest, { ref: ref, style: {
            width: '100px',
            height: 40,
            backgroundColor: style === null || style === void 0 ? void 0 : style.color,
        } }, { children: children })));
});
StyledColorPickerButton.displayName = 'StyledColorPickerButton';
StyledButton.displayName = 'StyledButton';
const LightButton = React.forwardRef((props, ref) => {
    const { children, size, className } = props, rest = __rest(props, ["children", "size", "className"]);
    return (_jsx(StyledButton, Object.assign({}, rest, { ref: ref, className: `${className} ${size}`, style: sharedCssVariables }, { children: children })));
});
LightButton.displayName = 'LightButton';
const StyledLightButton = styled(LightButton)(() => {
    return Object.assign(Object.assign({}, sharedButtonStyles), { background: 'var(--color-button)', color: 'var(--color-text)', '&:active, &:hover': {
            background: 'var(--color-background-elevated)',
            color: 'var(--color)',
            boxShadow: '0px 0px 7px #1111111a',
        } });
});
const TonalButton = Object.assign({}, LightButton);
TonalButton.displayName = 'TonalButton';
const StyledTonalButton = styled(LightButton)(() => {
    return Object.assign(Object.assign({}, sharedButtonStyles), { backgroundColor: 'var(--colorTonal)', color: 'var(--color)', '&:active, &:hover': {
            backgroundColor: 'var(--color)',
            color: 'var(--color-button)',
        } });
});
const OutlinedButton = Object.assign({}, LightButton);
OutlinedButton.displayName = 'OutlinedButton';
const StyledOutlinedButton = styled(OutlinedButton)(() => {
    return Object.assign(Object.assign({}, sharedButtonStyles), { backgroundColor: 'transparent', color: 'var(--color-text)', border: '1px solid currentColor', boxShadow: '0px 0px transparent', '&:active, &:hover': {
            background: 'transparent!important',
            boxShadow: '0px 3px 7px #51515159',
        } });
});
const SolidButton = Object.assign({}, LightButton);
SolidButton.displayName = 'SolidButton';
const StyledSolidButton = styled(SolidButton)(() => {
    return Object.assign(Object.assign({}, sharedButtonStyles), { backgroundColor: 'var(--color)', color: 'var(--color-button)', boxShadow: '0px 0px transparent', '&:active, &:hover': {
            backgroundColor: 'var(--color)!important',
            color: 'var(--color-button)',
            boxShadow: '0px 3px 3px #51515159',
        } });
});
export { StyledLightButton as LightButton, StyledTonalButton as TonalButton, StyledOutlinedButton as OutlinedButton, StyledSolidButton as SolidButton, };
