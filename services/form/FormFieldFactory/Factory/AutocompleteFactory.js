import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@mui/material';
import { Autocomplete } from '../../Field/Autocomplete';
export const AutocompleteFactory = (props) => {
    const { fld, disabled, multiSelect, value, hasChanged, error, touched, property, changeHandler, handleBlur, } = props;
    let { choices } = props;
    if (!choices) {
        return (_jsxs(_Fragment, { children: [_jsx(Skeleton, { width: '50%' }), _jsx(Skeleton, { variant: 'rectangular', height: 42 })] }));
    }
    if (property.null && !multiSelect) {
        if (Array.isArray(choices)) {
            const nullAlreadyAssigned = choices.find((item) => item.id == '__null__');
            if (!nullAlreadyAssigned) {
                choices = [{ label: property.null, id: '__null__' }, ...choices];
            }
        }
        else {
            choices = Object.assign({ __null__: property.null }, choices);
        }
    }
    return (_jsx(Autocomplete, { name: fld, label: property.label, value: value, multiple: multiSelect, required: property.required, disabled: disabled, onChange: changeHandler, onBlur: handleBlur, choices: choices, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, hasChanged: hasChanged }));
};
