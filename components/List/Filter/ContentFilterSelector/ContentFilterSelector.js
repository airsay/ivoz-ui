import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { useState } from 'react';
import { useStoreState } from 'store';
import { OutlinedButton, SolidButton, } from '../../../../components/shared/Button/Button.styles';
import { isPropertyScalar } from '../../../../services/api/ParsedApiSpecInterface';
import _ from '../../../../services/translations/translate';
import { FilterCriteria } from '../FilterCriteria';
import { StyledContentFilterRow } from './ContentFilterRow.styles';
export default function ContentFilterSelector(props) {
    const { entityService, commitCriteria, close, path, fkChoices, className, ignoreColumn, } = props;
    const queryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getCollectionParamList(storeState);
    const columnNames = Object.keys(columns).filter((column) => column !== ignoreColumn);
    const filters = {};
    for (const idx in columnNames) {
        const propertyName = columnNames[idx];
        filters[propertyName] = entityService.getPropertyFilters(propertyName, path);
    }
    const [criteria, setCriteria] = useState(() => {
        if (!queryStringCriteria.length)
            return [];
        return queryStringCriteria.map((row) => ({
            name: row.name,
            type: row.type,
            value: decodeURIComponent(row.value),
        }));
    });
    const fieldNames = {};
    for (const fldName in filters) {
        fieldNames[fldName] = columns[fldName].label;
    }
    const firstFilter = Object.keys(filters)[0];
    const currentColumn = columns[firstFilter];
    const propertyFilters = filters[firstFilter] || [];
    let preferredFilter = (currentColumn === null || currentColumn === void 0 ? void 0 : currentColumn.preferredFilter) || 'partial';
    if (currentColumn && !currentColumn.preferredFilter) {
        switch (true) {
            case isPropertyScalar(currentColumn) &&
                currentColumn.format === 'date-time':
                preferredFilter = 'exact';
                break;
        }
    }
    const defaultFilter = propertyFilters.includes(preferredFilter)
        ? preferredFilter
        : propertyFilters[0] || '';
    const setRow = (idx, name, type, value) => {
        const newCriteria = [...criteria];
        newCriteria[idx] = {
            name,
            type,
            value,
        };
        setCriteria(newCriteria);
    };
    const removeRow = (idx) => {
        const newCriteria = criteria.filter((val, index) => index !== idx);
        setCriteria(newCriteria);
    };
    const resetCriteria = (event) => {
        event.stopPropagation();
        event.preventDefault();
        commitCriteria([]);
    };
    const mobile = useMediaQuery(useTheme().breakpoints.down('md'));
    return (_jsxs("form", Object.assign({ className: className }, { children: [_jsxs(Box, Object.assign({ className: 'filters' }, { children: [_jsx("div", { children: _('Select Fields') }), !mobile &&
                        criteria.map((row, idx) => {
                            return (_jsx(StyledContentFilterRow, { idx: idx, filters: filters, row: row, columns: columns, fkChoices: fkChoices, fieldNames: fieldNames, isLast: false, setRow: setRow, removeRow: removeRow }, `${row.name}-${row.type}-${idx}`));
                        }), _jsx(StyledContentFilterRow, { idx: criteria.length, filters: filters, row: {
                            name: Object.keys(filters)[0],
                            type: defaultFilter,
                            value: '',
                        }, columns: columns, fkChoices: fkChoices, fieldNames: fieldNames, isLast: true, setRow: setRow, removeRow: removeRow }, criteria.length)] })), mobile && (_jsx(Box, { children: _jsx(FilterCriteria, { entityService: entityService, fkChoices: fkChoices, removeFilter: removeRow, path: path, criteriaOverride: criteria }) })), _jsxs(Box, Object.assign({ className: 'actions' }, { children: [_jsx(Box, { children: _jsx("a", Object.assign({ href: '#', onClick: resetCriteria, className: 'link' }, { children: _('Clear all filters') })) }), _jsxs(Box, Object.assign({ className: 'buttons' }, { children: [_jsx(OutlinedButton, Object.assign({ variant: 'contained', onClick: close }, { children: _('Cancel') })), _jsx(SolidButton, Object.assign({ variant: 'contained', disabled: criteria.length < 1, onClick: () => {
                                    const queryStringCriteriaWithoutPagination = criteria.filter((criteria) => criteria.name !== '_page');
                                    commitCriteria(queryStringCriteriaWithoutPagination);
                                } }, { children: _('Apply') }))] }))] }))] })));
}
