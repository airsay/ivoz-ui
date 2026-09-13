import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTextField } from '../../../form/Field/TextField/TextField.styles';
export const DateTimeFactory = (props) => {
    const { fld, property, disabled, value, hasChanged, error, touched, InputProps, changeHandler, handleBlur, } = props;
    return (_jsx(StyledTextField, { name: fld, type: 'datetime-local', value: value, inputProps: {
            step: 1,
        }, disabled: disabled, label: property.label, required: property.required, onChange: changeHandler, onBlur: handleBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, fullWidth: true, InputProps: InputProps, hasChanged: hasChanged }));
};
