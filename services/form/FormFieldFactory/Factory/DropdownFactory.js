import { jsx as _jsx } from "react/jsx-runtime";
import { StyledDropdown } from '../../../form/Field/Dropdown/Dropdown.styles';
export const DropdownFactory = (props) => {
    const { fld, disabled, value, hasChanged, error, touched, property, changeHandler, handleBlur, } = props;
    let { choices } = props;
    const enumValues = property.enum;
    if (Array.isArray(enumValues)) {
        choices = choices || {};
        for (const enumValue of enumValues) {
            choices[enumValue] = enumValue;
        }
    }
    else {
        choices = enumValues;
    }
    if (property.null) {
        if (Array.isArray(choices)) {
            choices.unshift({
                id: '__null__',
                label: property.null,
            });
        }
        else {
            choices = Object.assign({ __null__: property.null }, choices);
        }
    }
    let booleanValue = typeof value === 'boolean' ? +value : value;
    if (booleanValue === null) {
        booleanValue = '__null__';
    }
    return (_jsx(StyledDropdown, { name: fld, label: property.label, value: booleanValue, required: property.required, disabled: disabled, onChange: changeHandler, onBlur: handleBlur, choices: choices, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, hasChanged: hasChanged }));
};
