import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FormControl, FormHelperText, OutlinedInput, } from '@mui/material';
import { StyledHelpTextTooltip } from '../Shared/HelpText.styles';
export const TextField = (props) => {
    var _a;
    const { name, size, type, defaultValue, value, disabled, label, placeholder, multiline, required, onChange, onBlur, onKeyDown, onClick, error, errorMsg, helperText, inputProps, InputProps, hasChanged, inputRef, } = props;
    const margin = (_a = props.margin) !== null && _a !== void 0 ? _a : undefined;
    let className = props.className;
    if (hasChanged) {
        className += ' changed';
    }
    const labelId = `${name}-label`;
    const maxRows = multiline ? 6 : undefined;
    const fixDateTime = (value) => {
        const haveMissingSeconds = value.length === 16;
        return haveMissingSeconds ? value.concat(':00') : value;
    };
    const passThroughProps = {};
    if (onKeyDown) {
        passThroughProps.onKeyDown = onKeyDown;
    }
    if (onClick) {
        passThroughProps.onClick = onClick;
    }
    passThroughProps.onChange = (event) => {
        const { target } = event;
        if (type === 'datetime-local') {
            const fixedValue = fixDateTime(target.value);
            event.target = Object.assign(Object.assign({}, target), { value: fixedValue, name: target.name });
        }
        if (onChange) {
            onChange(event);
        }
    };
    return (_jsxs(FormControl, Object.assign({ variant: 'standard', fullWidth: true, error: error, className: className }, { children: [label && (_jsxs("label", Object.assign({ htmlFor: name, id: labelId }, { children: [label, required && '*', helperText && (_jsx(StyledHelpTextTooltip, Object.assign({ title: helperText, placement: 'top', arrow: true, className: 'help-tooltip' }, { children: _jsx(HelpOutlineIcon, {}) })))] }))), _jsx(OutlinedInput, Object.assign({}, passThroughProps, { ref: InputProps === null || InputProps === void 0 ? void 0 : InputProps.ref, name: name, type: type, size: size, multiline: multiline, maxRows: maxRows, placeholder: placeholder, defaultValue: defaultValue, value: value, disabled: disabled, onBlur: onBlur, error: error, className: 'input-field', margin: margin, inputProps: inputProps, startAdornment: InputProps === null || InputProps === void 0 ? void 0 : InputProps.startAdornment, endAdornment: InputProps === null || InputProps === void 0 ? void 0 : InputProps.endAdornment, inputRef: inputRef })), error && errorMsg && (_jsx(FormHelperText, Object.assign({ className: 'helper-error' }, { children: errorMsg })))] })));
};
