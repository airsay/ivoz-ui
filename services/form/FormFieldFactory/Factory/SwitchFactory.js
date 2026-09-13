import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { FormControlLabel, Switch } from '@mui/material';
import { SwitchFormControl } from '../../../form/Field/SwitchFormControl';
import { StyledHelpTextTooltip } from '../../Field/Shared/HelpText.styles';
export const SwitchFactory = (props) => {
    const { fld, disabled, value, hasChanged, property, changeHandler, handleBlur, } = props;
    const checked = Array.isArray(value) ? value.includes('1') : Boolean(value);
    const helpText = property.helpText;
    const label = helpText ? (_jsxs(_Fragment, { children: [property.label, _jsx(StyledHelpTextTooltip, Object.assign({ title: helpText, placement: 'top', arrow: true, className: 'help-tooltip' }, { children: _jsx(HelpOutlineIcon, {}) }))] })) : (property.label);
    return (_jsx(SwitchFormControl, Object.assign({ hasChanged: hasChanged }, { children: _jsx(FormControlLabel, { disabled: disabled, control: _jsx(Switch, { name: fld, checked: checked, onChange: changeHandler, onBlur: handleBlur, value: true }), label: label }) })));
};
