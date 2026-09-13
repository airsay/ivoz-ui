import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Paper, Typography } from '@mui/material';
import MuiAutocomplete from '@mui/material/Autocomplete';
import { useCallback, useEffect, useState, useRef, } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledAutocompleteTextField } from '../TextField';
import SearchIcon from '@mui/icons-material/Search';
const DynamicAutocomplete = (props) => {
    var _a;
    const { nullOption, name, label, required, multiple, disabled, onBlur, error, errorMsg, helperText, hasChanged, value, choices, selectOptions, onChange, } = props;
    const { t } = useTranslation();
    let className = props.className || '';
    if (hasChanged) {
        className += ' changed';
    }
    if (multiple) {
        className += ' multiselect';
    }
    const nullOptionObject = {
        id: '__null__',
        label: nullOption !== null && nullOption !== void 0 ? nullOption : '',
    };
    const [arrayChoices, setArrayChoices] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [currentOption, setCurrentOption] = useState(nullOptionObject);
    const debounceTimeoutRef = useRef();
    const loadedValuesRef = useRef(new Set());
    const currentOptionRef = useRef(nullOptionObject);
    const updateCurrentOption = useCallback((option) => {
        currentOptionRef.current = option;
        setCurrentOption(option);
    }, []);
    useEffect(() => {
        if (selectOptions && Object.keys(choices).length === 0) {
            return;
        }
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
    useEffect(() => {
        const nullValue = !value || value === '__null__';
        if (nullValue) {
            return;
        }
        if (!selectOptions) {
            return;
        }
        if (loadedValuesRef.current.has(value)) {
            return;
        }
        loadedValuesRef.current.add(value);
        selectOptions({
            callback: (options) => {
                var _a;
                const allChoices = options;
                const option = (_a = allChoices.find((item) => item.id == value)) !== null && _a !== void 0 ? _a : allChoices[0];
                if (option) {
                    updateCurrentOption(option);
                    setArrayChoices((prev) => {
                        const exists = prev.some((item) => item.id == option.id);
                        return exists ? prev : [...prev, option];
                    });
                }
            },
        }, { id: value });
    }, [value, selectOptions]);
    const setOptions = useCallback((options) => {
        const co = currentOptionRef.current;
        const isCurrentOptionIncluded = options.some((option) => option.id == (co === null || co === void 0 ? void 0 : co.id));
        if (!isCurrentOptionIncluded && co && co.id !== '__null__') {
            options.unshift(co);
        }
        if (nullOptionObject) {
            options.unshift(nullOptionObject);
        }
        setArrayChoices(options);
    }, [nullOptionObject]);
    const clearSearch = useCallback(() => {
        if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
        }
        setLoading(false);
    }, []);
    const loadOptions = useCallback((searchValue) => {
        if (!selectOptions) {
            console.error('selectOptions is not defined');
            return;
        }
        setLoading(true);
        debounceTimeoutRef.current = setTimeout(() => {
            selectOptions({
                callback: (options) => {
                    setLoading(false);
                    setOptions(options);
                },
            }, { searchTerm: searchValue });
        }, 500);
    }, [selectOptions, setOptions]);
    useEffect(() => {
        clearSearch();
        const searchTermMatchNullOption = searchTerm !== '' && getOptionLabel(nullOptionObject) === searchTerm;
        if (searchTermMatchNullOption) {
            return;
        }
        const isSearchTermIncluded = searchTerm !== '' &&
            (arrayChoices === null || arrayChoices === void 0 ? void 0 : arrayChoices.some((option) => getOptionLabel(option).includes(searchTerm)));
        if (isSearchTermIncluded) {
            return;
        }
        loadOptions(searchTerm);
    }, [searchTerm, selectOptions]);
    const handleInputChange = useCallback((e, value, reason) => {
        if (reason === 'clear') {
            setSearchTerm('');
            return;
        }
        if (reason === 'input') {
            setSearchTerm(value);
            return;
        }
        if (reason === 'reset') {
            if (arrayChoices.length === 0) {
                setSearchTerm('');
            }
        }
    }, []);
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
            selectedValue = (arrayChoices === null || arrayChoices === void 0 ? void 0 : arrayChoices.find((item) => item.id === '__null__'))
                ? '__null__'
                : null;
        }
        updateCurrentOption(option);
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
            value = arrayChoices === null || arrayChoices === void 0 ? void 0 : arrayChoices.find((option) => option.id == value);
        }
        const isTranslation = (value === null || value === void 0 ? void 0 : value.label) &&
            typeof value.label === 'object' &&
            ((_b = (_a = value.label) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.defaults) &&
            typeof ((_d = (_c = value.label) === null || _c === void 0 ? void 0 : _c.props) === null || _d === void 0 ? void 0 : _d.defaults) === 'string';
        if (isTranslation) {
            const translatableText = (_f = (_e = value.label) === null || _e === void 0 ? void 0 : _e.props) === null || _f === void 0 ? void 0 : _f.defaults;
            return t(translatableText);
        }
        return (value === null || value === void 0 ? void 0 : value.label) || '';
    }, [arrayChoices, t]);
    const isOptionEqualToValue = useCallback((option, value) => {
        if (value === (currentOption === null || currentOption === void 0 ? void 0 : currentOption.id)) {
            return true;
        }
        if ((option === null || option === void 0 ? void 0 : option.id) == value) {
            return true;
        }
        if ((option === null || option === void 0 ? void 0 : option.id) == value.id) {
            return true;
        }
        return false;
    }, []);
    const arrayChoicesLength = (_a = arrayChoices === null || arrayChoices === void 0 ? void 0 : arrayChoices.length) !== null && _a !== void 0 ? _a : 0;
    const renderInput = useCallback((props) => {
        const inputProps = Object.assign(Object.assign({}, props.InputProps), { notched: true });
        const showPlaceholder = !searchTerm && !loading;
        const inputPlaceholder = showPlaceholder
            ? t('Type to search')
            : props.placeholder;
        return (_jsx(StyledAutocompleteTextField, Object.assign({}, props, { name: name, label: label, required: required, disabled: disabled, InputProps: inputProps, InputLabelProps: { shrink: true, required: required }, error: error, errorMsg: errorMsg, helperText: helperText, placeholder: inputPlaceholder })));
    }, [
        name,
        label,
        required,
        disabled,
        error,
        errorMsg,
        helperText,
        arrayChoicesLength,
        searchTerm,
        loading,
    ]);
    const dropdownHelperText = 'Type to load more options';
    const CustomOption = useCallback((props) => {
        return (_jsxs(Paper, Object.assign({}, props, { children: [props.children, dropdownHelperText && (_jsxs(Box, Object.assign({ sx: {
                        p: 2,
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        backgroundColor: 'var(--color-background)',
                        color: 'var(--color-text)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                    } }, { children: [_jsx(SearchIcon, { sx: { fontSize: '18px' } }), _jsx(Typography, Object.assign({ variant: 'caption' }, { children: t(dropdownHelperText) }))] })))] })));
    }, [dropdownHelperText]);
    const disableClearable = arrayChoices.find((item) => item.id === '__null__')
        ? false
        : true;
    const safeValue = arrayChoices.find((item) => item.id == value)
        ? value
        : null;
    return (_jsx(MuiAutocomplete, { className: 'dynamic-autocomplete ' + className, value: safeValue, multiple: multiple, disabled: disabled, disableClearable: disableClearable, onChange: onChangeWrapper, onBlur: onBlur, onInputChange: handleInputChange, options: arrayChoices !== null && arrayChoices !== void 0 ? arrayChoices : [], getOptionLabel: getOptionLabel, isOptionEqualToValue: isOptionEqualToValue, loading: loading, placeholder: props.placeholder, renderInput: renderInput, PaperComponent: CustomOption, renderOption: (props, option) => (_jsx(Box, Object.assign({ component: 'li', className: 'autocomplete-option', "data-value": option.id }, props, { children: option.label }))) }));
};
export default DynamicAutocomplete;
