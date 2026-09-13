import { jsx as _jsx } from "react/jsx-runtime";
import { StyledTextField } from '../../../form/Field/TextField/TextField.styles';
export const NumberFactory = (props) => {
    const { fld, property, disabled, value, hasChanged, error, touched, inputProps, InputProps, changeHandler, handleBlur, } = props;
    if (property.minimum !== undefined) {
        inputProps.min = property.minimum;
    }
    if (property.maximum !== undefined) {
        inputProps.max = property.maximum;
    }
    return (_jsx(StyledTextField, { name: fld, type: 'number', value: value, disabled: disabled, label: property.label, required: property.required, onChange: changeHandler, onBlur: handleBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, inputProps: inputProps, InputProps: InputProps, hasChanged: hasChanged }));
};
