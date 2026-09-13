import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTextField } from '../../../form/Field/TextField/TextField.styles';
export const DateFactory = (props) => {
    const { fld, property, disabled, value, hasChanged, error, touched, InputProps, changeHandler, handleBlur, } = props;
    return (_jsx(StyledTextField, { name: fld, type: 'date', value: value, disabled: disabled, label: property.label, required: property.required, onChange: changeHandler, onBlur: handleBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, InputProps: InputProps, hasChanged: hasChanged }));
};
