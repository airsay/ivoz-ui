import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { isPropertyFk } from '../../../api';
import { DynamicAutocomplete } from '../../Field/DynamicAutocomplete';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
export const DynamicAutocompleteFactory = (props) => {
    const { entityService, fld, disabled, multiSelect, value, hasChanged, error, touched, property, changeHandler, handleBlur, } = props;
    let { choices } = props;
    const [selectOptionsLoader, setSelectOptionsLoader] = useState(undefined);
    const cleanRef = isPropertyFk(property)
        ? property.$ref.replace('#/definitions/', '')
        : '';
    useEffect(() => {
        if (!cleanRef) {
            return;
        }
        const selectOptionsGetter = entityService.getDynamicAutocompleteGetters({
            entityService,
            skip: [],
        });
        selectOptionsGetter.then((getters) => {
            const selectOptions = getters[cleanRef];
            if (selectOptions) {
                setSelectOptionsLoader({ selectOptions: selectOptions });
            }
        });
    }, [cleanRef, entityService]);
    if (!selectOptionsLoader || !choices) {
        return (_jsxs(_Fragment, { children: [_jsx(Skeleton, { width: '50%' }), _jsx(Skeleton, { variant: 'rectangular', height: 42 })] }));
    }
    if (property.null) {
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
    return (_jsx(DynamicAutocomplete, { name: fld, label: property.label, value: value, choices: choices, multiple: multiSelect, nullOption: property.null, required: property.required, disabled: disabled, onBlur: handleBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, hasChanged: hasChanged, onChange: changeHandler, selectOptions: selectOptionsLoader.selectOptions }));
};
