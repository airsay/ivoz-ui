import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
import MuiAutocomplete from '@mui/material/Autocomplete';
import { useCallback, useEffect, useState, } from 'react';
import { getI18n } from 'react-i18next';
import { StyledAutocompleteTextField } from '../TextField';
const Autocomplete = (props) => {
    var _a, _b;
    const { name, label, required, multiple, disabled, onChange, onBlur, choices, error, errorMsg, helperText, hasChanged, } = props;
    const value = (_a = props.value) !== null && _a !== void 0 ? _a : null;
    const i18n = getI18n();
    let className = props.className;
    if (hasChanged) {
        className += ' changed';
    }
    if (multiple) {
        className += ' multiselect';
    }
    const [arrayChoices, setArrayChoices] = useState([]);
    useEffect(() => {
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
    const onChangeWrapper = useCallback((e, option, reason) => {
        let selectedValue = undefined;
        if (reason !== 'clear' && option !== null) {
            selectedValue = multiple
                ? option.map((item) => typeof item === 'object' ? item.id : item)
                : option.id;
        }
        else if (reason === 'clear') {
            selectedValue = '';
        }
        else {
            selectedValue = arrayChoices.find((item) => item.id === '__null__')
                ? '__null__'
                : undefined;
        }
        onChange({
            target: {
                name: name,
                value: selectedValue,
            },
        });
    }, [multiple, onChange, name, arrayChoices]);
    const getOptionLabel = useCallback((value) => {
        var _a, _b, _c, _d, _e, _f;
        if (typeof value !== 'object') {
            value = arrayChoices.find((option) => option.id == value);
        }
        const isTranslation = (value === null || value === void 0 ? void 0 : value.label) &&
            typeof value.label === 'object' &&
            ((_b = (_a = value.label) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.defaults) &&
            typeof ((_d = (_c = value.label) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d.defaults) === 'string';
        if (isTranslation) {
            const translatableText = (_f = (_e = value.label) === null || _e === void 0 ? void 0 : _e.props) === null || _f === void 0 ? void 0 : _f.defaults;
            return i18n.t(translatableText);
        }
        return (value === null || value === void 0 ? void 0 : value.label) || '';
    }, [arrayChoices, i18n]);
    const isOptionEqualToValue = useCallback((option, value) => {
        if (option.id == value) {
            return true;
        }
        if (option.id == value.id) {
            return true;
        }
        return false;
    }, []);
    const renderInput = useCallback((props) => {
        const InputProps = Object.assign(Object.assign({}, props.InputProps), { notched: true });
        return (_jsx(StyledAutocompleteTextField, Object.assign({}, props, { name: name, label: label, required: required, disabled: disabled, InputProps: InputProps, InputLabelProps: { shrink: true, required: required }, error: error, errorMsg: errorMsg, helperText: helperText })));
    }, [name, label, required, disabled, error, errorMsg, helperText]);
    let disableClearable = props.disableClearable;
    if (disableClearable === undefined) {
        disableClearable = arrayChoices.find((item) => item.id === '__null__')
            ? false
            : true;
    }
    const autoDefaultValue = (value) => {
        if (value !== '__auto__') {
            return value;
        }
        if (arrayChoices.length === 0) {
            return value;
        }
        const realChoices = arrayChoices.filter((dac) => dac.id != '__null__');
        if (realChoices.length != 1) {
            return '__null__';
        }
        return realChoices[0].id;
    };
    let autocompleteValue;
    if (multiple) {
        autocompleteValue = arrayChoices.length ? value : [];
    }
    else {
        const autoValue = autoDefaultValue(value);
        autocompleteValue =
            (_b = arrayChoices === null || arrayChoices === void 0 ? void 0 : arrayChoices.find((item) => `${item.id}` === `${autoValue}`)) !== null && _b !== void 0 ? _b : null;
        if (autoValue != value) {
            onChange({
                target: {
                    name: name,
                    value: autoValue,
                },
            });
        }
    }
    return (_jsx(MuiAutocomplete, { className: 'autocomplete ' + className, value: autocompleteValue, multiple: multiple, disabled: disabled, disableClearable: disableClearable, onChange: onChangeWrapper, onBlur: onBlur, options: arrayChoices, getOptionLabel: getOptionLabel, isOptionEqualToValue: isOptionEqualToValue, filterSelectedOptions: true, renderInput: renderInput, renderOption: (props, option) => (_jsx(Box, Object.assign({ component: 'li', className: 'autocomplete-option', "data-value": option.id }, props, { children: option.label }))) }));
};
export default Autocomplete;
