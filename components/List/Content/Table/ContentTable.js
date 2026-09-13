import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useStoreState } from '../../../../store';
import EditRowButton from '../CTA/EditRowButton';
import ViewRowButton from '../CTA/ViewRowButton';
import ChildEntityLinks from '../Shared/ChildEntityLinks';
import { StyledActionsTableCell, StyledTable } from './ContentTable.styles';
import { TableColumnMemo } from './ContentTableColumn';
import ContentTableHead from './ContentTableHead';
const ContentTable = (props) => {
    const { childEntities, entityService, path, ignoreColumn, selectedValues, handleChange, setSelectedValues, className, } = props;
    const [currentQueryString, setCurrentQueryString] = useState(window.location.search);
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const rows = useStoreState((state) => state.list.rows);
    useEffect(() => {
        if (currentQueryString !== window.location.search) {
            setCurrentQueryString(window.location.search);
            setSelectedValues([]);
        }
    }, [currentQueryString, window.location.search]);
    const entity = entityService.getEntity();
    const ChildDecorator = entity.ChildDecorator;
    const updateRouteMapItem = {
        entity,
        route: `${entity.path}/:id/update`,
    };
    const detailMapItem = {
        entity,
        route: `${entity.path}/:id/detailed`,
    };
    const multiselectActions = Object.values(entity.customActions)
        .filter((action) => action.multiselect)
        .map((item) => item.action);
    const columns = entityService.getCollectionColumns(storeState);
    const parentRow = useStoreState((state) => state.list.parentRow);
    const acl = entityService.getAcls(parentRow);
    const multiselect = (entity.deleteDoubleCheck !== true && acl.delete === true) ||
        multiselectActions.length > 0;
    const deleteMapItem = {
        entity,
        route: `${entity.path}/:id`,
        disabled: !acl.delete,
    };
    const selectAllHandlers = useCallback((event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const rowIds = value ? rows.map((row) => { var _a; return ((_a = row.id) === null || _a === void 0 ? void 0 : _a.toString()) || ''; }) : [];
        setSelectedValues(rowIds);
    }, [rows, setSelectedValues]);
    const indeterminateSelectAll = rows.length !== selectedValues.length;
    const checked = selectedValues.length > 0;
    const showDetail = acl.detail && !acl.update;
    return (_jsxs(StyledTable, Object.assign({ size: 'medium', className: className }, { children: [_jsx(ContentTableHead, { entityService: entityService, ignoreColumn: ignoreColumn, multiselect: multiselect, selectAll: selectAllHandlers, checked: checked, indeterminateSelectAll: checked && indeterminateSelectAll }), _jsx(TableBody, { children: rows.map((row, key) => {
                    var _a, _b;
                    const checked = selectedValues.indexOf((_a = row === null || row === void 0 ? void 0 : row.id) === null || _a === void 0 ? void 0 : _a.toString()) > -1;
                    const isEditable = (_b = row.editable) !== null && _b !== void 0 ? _b : true;
                    return (_jsxs(TableRow, { children: [multiselect && (_jsx(TableCell, { children: _jsx(Checkbox, { name: `${row.id}`, checked: checked, onChange: handleChange }) })), Object.keys(columns).map((columnKey) => {
                                if (columnKey === ignoreColumn) {
                                    return null;
                                }
                                const column = columns[columnKey];
                                return (_jsx(TableColumnMemo, { columnName: columnKey, column: column, row: row, entityService: entityService }, columnKey));
                            }), _jsx(StyledActionsTableCell, { children: _jsx(Box, Object.assign({ className: 'actions-cell' }, { children: _jsx(ChildEntityLinks, { childEntities: childEntities, entityService: entityService, row: row, detail: showDetail && (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: detailMapItem, row: row, entityService: entityService }, { children: _jsx(ViewRowButton, { row: row, path: path }) }))), edit: (acl.update || !showDetail) && (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: updateRouteMapItem, row: row, entityService: entityService, disabled: !acl.update || !isEditable }, { children: _jsx(EditRowButton, { disabled: !acl.update || !isEditable, row: row, path: path }) }))), deleteMapItem: deleteMapItem }) })) }, 'actions')] }, `${key}-${row.id}`));
                }) })] })));
};
export default ContentTable;
