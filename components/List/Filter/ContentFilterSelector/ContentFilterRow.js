import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { memo, useEffect, useMemo, useState } from 'react';
import { LightButton, TonalButton, } from '../../../../components/shared/Button/Button.styles';
import { isPropertyFk, isPropertyScalar, } from '../../../../services/api/ParsedApiSpecInterface';
import { StyledDropdown } from '../../../../services/form/Field/Dropdown/Dropdown.styles';
import { StyledDynamicAutocomplete } from '../../../../services/form/Field/DynamicAutocomplete/DynamicAutocomplete.styles';
import { StyledTextField } from '../../../../services/form/Field/TextField/TextField.styles';
import _ from '../../../../services/translations/translate';
import FilterIconFactory from '../icons/FilterIconFactory';
import StoreContainer from '../../../../store/StoreContainer';
const StyledDropdownMemo = memo(StyledDropdown, (prev, next) => {
    return prev.value === next.value;
});
export default function ContentFilterRow(props) {
    const { idx, filters, row, columns, fkChoices, fieldNames, isLast, setRow, removeRow, className, } = props;
    const [name, setName] = useState(row.name);
    if (!filters[name]) {
        return null;
    }
    const isCollectionFilter = useMemo(() => (filters[name] || []).includes('all'), [filters, name]);
    const filterChoices = useMemo(() => {
        const choices = {};
        for (const filter of filters[name]) {
            choices[filter] = FilterIconFactory({
                name: filter,
                includeLabel: true,
                collection: isCollectionFilter,
            });
        }
        return choices;
    }, [filters, name, isCollectionFilter]);
    const [type, setType] = useState(row.type);
    const [value, setValue] = useState(row.value);
    useEffect(() => {
        setName(row.name);
        setType(row.type);
        setValue(row.value);
    }, [row.name, row.type, row.value]);
    const column = columns[name];
    const [selectOptions, setSelectOptions] = useState(null);
    const { useDynamicAutocomplete, entityName, enumValue } = useMemo(() => {
        var _a;
        let enumVal = null;
        let useDynamic = false;
        let entName = '';
        if (isPropertyFk(column)) {
            const entities = StoreContainer.store.getState().entities.entities;
            entName = ((_a = column.$ref) === null || _a === void 0 ? void 0 : _a.replace('#/definitions/', '')) || '';
            const entity = entities === null || entities === void 0 ? void 0 : entities[entName];
            if (entity === null || entity === void 0 ? void 0 : entity.dynamicSelectOptions) {
                useDynamic = true;
            }
            else {
                enumVal = fkChoices[name] || {};
            }
        }
        else if (column.enum) {
            enumVal = column.enum;
        }
        else if (column.type === 'boolean') {
            enumVal = {
                true: _('True'),
                false: _('False'),
            };
        }
        return {
            useDynamicAutocomplete: useDynamic,
            entityName: entName,
            enumValue: enumVal,
        };
    }, [column, name, fkChoices]);
    useEffect(() => {
        if (!useDynamicAutocomplete || !entityName) {
            return;
        }
        const entities = StoreContainer.store.getState().entities.entities;
        const entity = entities === null || entities === void 0 ? void 0 : entities[entityName];
        if (entity === null || entity === void 0 ? void 0 : entity.selectOptions) {
            entity.selectOptions().then((handler) => {
                setSelectOptions(() => handler);
            });
        }
    }, [useDynamicAutocomplete, entityName]);
    const columnFormat = isPropertyScalar(column) && column.format;
    let textFieldInputType = 'text';
    const inputProps = {};
    switch (columnFormat) {
        case 'date-time':
            textFieldInputType = 'datetime-local';
            inputProps.step = 1;
            break;
    }
    const isSetOperator = (candidate) => candidate === 'all' ||
        candidate === 'none' ||
        candidate === 'only' ||
        (isCollectionFilter && candidate === 'in');
    const isMultiple = isSetOperator(type);
    const multipleValue = useMemo(() => {
        if (value === '' || value === undefined) {
            return [];
        }
        return String(value).split(',');
    }, [value]);
    const setValueFromEvent = (eventValue) => {
        setValue(Array.isArray(eventValue) ? eventValue.join(',') : eventValue);
    };
    const updateCriteria = () => {
        setRow(idx, name, type, value);
    };
    useEffect(() => {
        const timeOutId = setTimeout(() => {
            if (!isLast) {
                updateCriteria();
            }
        }, 250);
        return () => clearTimeout(timeOutId);
    }, [name, type, value, isLast]);
    const mobile = useMediaQuery(useTheme().breakpoints.down('md'));
    return (_jsxs(Box, Object.assign({ className: className }, { children: [_jsx(StyledDropdownMemo, { name: 'name', label: '', value: name, required: false, disabled: false, onChange: ({ target }) => {
                    const val = target.value;
                    setName(val);
                    setType(filters[val][0]);
                    setValue('');
                }, onBlur: () => {
                    /* noop */
                }, choices: fieldNames, error: false, errorMsg: '', hasChanged: false }), _jsx(StyledDropdown, { name: 'type', label: '', value: type, required: false, disabled: false, onChange: ({ target }) => {
                    // Switching in or out of a set based operator invalidates the value
                    if (isSetOperator(target.value) !== isMultiple) {
                        setValue('');
                    }
                    setType(target.value);
                }, onBlur: () => {
                    /* noop */
                }, choices: filterChoices, error: false, errorMsg: '', hasChanged: false }), type === 'exists' && (_jsx(StyledDropdown, { name: 'value', label: '', value: value === '' ? 'true' : value, required: false, disabled: false, onChange: ({ target }) => {
                    setValue(target.value);
                }, onBlur: () => {
                    /* noop */
                }, choices: { true: _('True'), false: _('False') }, error: false, errorMsg: '', hasChanged: false })), type !== 'exists' && !enumValue && !useDynamicAutocomplete && (_jsx(StyledTextField, { name: 'value', value: value, type: textFieldInputType, error: false, errorMsg: '', inputProps: inputProps, InputProps: {}, hasChanged: false, onChange: ({ target }) => {
                    let { value } = target;
                    if (textFieldInputType === 'datetime-local') {
                        value = value.replace('T', ' ');
                    }
                    setValue(value);
                } })), type !== 'exists' && useDynamicAutocomplete && selectOptions && (_jsx(StyledDynamicAutocomplete, { name: 'value', label: '', value: isMultiple ? multipleValue : value, choices: {}, multiple: isMultiple, required: false, disabled: false, onChange: ({ target }) => {
                    setValueFromEvent(target.value);
                }, onBlur: () => {
                    /* noop */
                }, selectOptions: selectOptions, error: false, errorMsg: '', hasChanged: false })), type !== 'exists' && enumValue && !useDynamicAutocomplete && (_jsx(StyledDropdown, { name: 'value', label: '', multiple: isMultiple, value: isMultiple ? multipleValue : value, required: false, disabled: false, onChange: ({ target }) => {
                    setValueFromEvent(target.value);
                }, onBlur: () => {
                    /* noop */
                }, choices: enumValue, error: false, errorMsg: '', hasChanged: false })), isLast && (_jsxs(TonalButton, Object.assign({ onClick: updateCriteria }, { children: [_jsx(AddIcon, {}), mobile && _('Add')] }))), !isLast && (_jsx(LightButton, Object.assign({ onClick: () => {
                    removeRow(idx);
                } }, { children: _jsx(DeleteOutlineIcon, {}) })))] })));
}
