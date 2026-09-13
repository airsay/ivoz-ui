import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FormControl, FormHelperText, MenuItem, OutlinedInput, Select, } from '@mui/material';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useEffect, useState, } from 'react';
import { StyledHelpTextTooltip } from '../Shared/HelpText.styles';
const Dropdown = (props) => {
    const { name, label, value, required, disabled, onChange, onBlur, choices, error, errorMsg, helperText, hasChanged, className, multiple = false, } = props;
    const labelId = `${name}-label`;
    const labelClassName = hasChanged ? 'changed' : '';
    const [prevChoices, setPrevChoices] = useState();
    const [arrayChoices, setArrayChoices] = useState([]);
    useEffect(() => {
        setPrevChoices(choices);
        if (Array.isArray(choices)) {
            setArrayChoices(choices);
            return;
        }
        const arrayValue = [];
        for (const idx in choices) {
            arrayValue.push({ id: idx, label: choices[idx] });
        }
        setArrayChoices(arrayValue);
    }, [choices]);
    const ready = choices === prevChoices;
    return (_jsxs(FormControl, Object.assign({ fullWidth: true, error: error, className: `${className}` }, { children: [label && (_jsxs("label", Object.assign({ htmlFor: name, id: labelId, className: labelClassName }, { children: [label, required && '*', helperText && (_jsx(StyledHelpTextTooltip, Object.assign({ title: helperText, placement: 'top', arrow: true, className: 'help-tooltip' }, { children: _jsx(HelpOutlineIcon, {}) })))] }))), _jsx(Select, Object.assign({ multiple: multiple, value: ready ? value : multiple ? [] : '', renderValue: multiple
                    ? (selected) => selected.map((id, idx) => {
                        const choice = arrayChoices.find((item) => `${item.id}` === `${id}`);
                        return (_jsxs("span", { children: [idx > 0 && ', ', choice ? choice.label : id] }, `${id}-${idx}`));
                    })
                    : undefined, disabled: disabled, onChange: onChange, onBlur: onBlur, displayEmpty: true, variant: 'outlined', className: 'select', input: _jsx(OutlinedInput, { name: name, type: 'text', label: label, notched: false }) }, { children: arrayChoices
                    .filter(({ label }) => label)
                    .map((arrayChoice, key) => {
                    return (_jsx(MenuItem, Object.assign({ value: arrayChoice.id }, { children: arrayChoice.label }), `${arrayChoice.id}-${key}`));
                }) })), error && errorMsg && _jsx(FormHelperText, { children: errorMsg })] })));
};
export default Dropdown;
