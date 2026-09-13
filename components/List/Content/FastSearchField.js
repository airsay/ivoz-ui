import { jsx as _jsx } from "react/jsx-runtime";
import SearchIcon from '@mui/icons-material/Search';
import { forwardRef, useEffect, useMemo, useState } from 'react';
import { StyledSearchTextField } from '../../../services/form/Field/TextField/TextField.styles';
import { useStoreActions, useStoreState } from 'store';
import { isPropertyFk } from '../../../services';
import { StyledAutocomplete } from '../../../services/form/Field/Autocomplete/Autocomplete.styles';
import { StyledDynamicAutocomplete } from '../../../services/form/Field/DynamicAutocomplete/DynamicAutocomplete.styles';
import useFirstColumn from './hook/useFirstColumn';
import useFirstColumnCriteria from './hook/useFirstColumnCriteria';
import StoreContainer from '../../../store/StoreContainer';
const FastSearchField = (props, ref) => {
    const { className, path, entityService, ignoreColumn } = props;
    const storeQueryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    const setQueryStringCriteria = useStoreActions((actions) => {
        return actions.route.setQueryStringCriteria;
    });
    const firstColumnCriteria = useFirstColumnCriteria({
        entityService,
        path,
        ignoreColumn,
    });
    const [firstColumnName, firstColumnSpec] = useFirstColumn({
        entityService,
        ignoreColumn,
    });
    const isFk = isPropertyFk(firstColumnSpec);
    const foreignEntities = useStoreState((state) => state.list.fkChoices);
    const fkChoices = foreignEntities[firstColumnName] || [];
    const [selectOptions, setSelectOptions] = useState(undefined);
    const { useDynamicAutocomplete, entityName } = useMemo(() => {
        var _a;
        if (!isFk) {
            return { useDynamicAutocomplete: false, entityName: '' };
        }
        const entities = StoreContainer.store.getState().entities.entities;
        const entName = ((_a = firstColumnSpec.$ref) === null || _a === void 0 ? void 0 : _a.replace('#/definitions/', '')) || '';
        const entity = entities === null || entities === void 0 ? void 0 : entities[entName];
        return {
            useDynamicAutocomplete: (entity === null || entity === void 0 ? void 0 : entity.dynamicSelectOptions) || false,
            entityName: entName,
        };
    }, [isFk, firstColumnSpec]);
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
    const isDatetime = !isFk && firstColumnSpec.format === 'date-time';
    const initialValue = (firstColumnCriteria === null || firstColumnCriteria === void 0 ? void 0 : firstColumnCriteria.value) || '';
    const [value, setValue] = useState(isDatetime ? initialValue.replace(' ', 'T') : initialValue);
    const triggerSearchIfChanged = () => {
        if (!firstColumnCriteria) {
            return;
        }
        if (firstColumnCriteria.value == value) {
            return;
        }
        if (value !== '') {
            const val = isDatetime ? value.replace('T', ' ') : value;
            firstColumnCriteria.value = encodeURIComponent(val);
        }
        let match = false;
        let matchIdx;
        const queryStringCriteria = [...storeQueryStringCriteria];
        for (const idx in queryStringCriteria) {
            if (queryStringCriteria[idx].name !== firstColumnCriteria.name) {
                continue;
            }
            if (queryStringCriteria[idx].type !== firstColumnCriteria.type) {
                continue;
            }
            queryStringCriteria[idx] = firstColumnCriteria;
            matchIdx = idx;
            match = true;
            break;
        }
        if (!match) {
            queryStringCriteria.push(firstColumnCriteria);
        }
        else if (value === '' && matchIdx) {
            queryStringCriteria.splice(parseInt(matchIdx, 10), 1);
        }
        const queryStringCriteriaWithoutPagination = queryStringCriteria.filter((criteria) => criteria.name !== '_page');
        setQueryStringCriteria(queryStringCriteriaWithoutPagination);
    };
    const changeHandler = ({ target }) => {
        setValue(target.value);
    };
    useEffect(() => {
        //reset value
        setValue(decodeURIComponent(firstColumnCriteria === null || firstColumnCriteria === void 0 ? void 0 : firstColumnCriteria.value) || '');
    }, [firstColumnCriteria]);
    useEffect(() => {
        if (isDatetime) {
            return;
        }
        const timeOutId = setTimeout(() => {
            triggerSearchIfChanged();
            return;
        }, 2000);
        return () => clearTimeout(timeOutId);
    }, [value, firstColumnCriteria]);
    if (isFk && useDynamicAutocomplete) {
        return (_jsx(StyledDynamicAutocomplete, { name: 'fast_search', label: '', className: className, value: value, choices: {}, multiple: false, required: false, disabled: false, onChange: changeHandler, onBlur: () => {
                /* noop */
            }, selectOptions: selectOptions, error: false, errorMsg: '', hasChanged: false }));
    }
    if (isFk) {
        return (_jsx(StyledAutocomplete, { className: className, name: 'fast_search', label: '', placeholder: 'Search', value: value, multiple: false, required: false, disabled: false, onChange: changeHandler, onBlur: () => {
                /* noop */
            }, choices: fkChoices, disableClearable: false, hasChanged: false, InputProps: {
                startAdornment: _jsx(SearchIcon, {}),
            } }));
    }
    let type = 'text';
    const inputProps = {};
    if (isDatetime) {
        type = 'datetime-local';
        inputProps.step = 1;
    }
    return (_jsx(StyledSearchTextField, { name: 'fast_search', type: type, error: false, value: value, errorMsg: '', inputProps: inputProps, InputProps: {
            startAdornment: _jsx(SearchIcon, {}),
        }, onBlur: () => {
            if (!isDatetime) {
                return;
            }
            triggerSearchIfChanged();
        }, onKeyDown: (event) => {
            if (event.code !== 'Enter') {
                return;
            }
            triggerSearchIfChanged();
        }, placeholder: 'Search', hasChanged: false, onChange: changeHandler, ref: ref }));
};
export default forwardRef(FastSearchField);
