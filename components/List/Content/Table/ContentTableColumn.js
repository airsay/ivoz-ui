import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { isPropertyFk, } from '../../../../services/api/ParsedApiSpecInterface';
import ListContentValue from '../ListContentValue';
import { StyledTableCell } from './ContentTable.styles';
import { useStoreState } from 'store';
export const TableColumn = (props) => {
    const { columnName, column, row, entityService } = props;
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const size = entityService.getColumnSize(columnName, storeState);
    return (_jsx(StyledTableCell, Object.assign({ style: { width: `${size}%` } }, { children: _jsx(ListContentValue, { columnName: columnName, column: column, row: row, entityService: entityService }) }), row.id));
};
export const TableColumnMemo = React.memo(TableColumn, (prev, next) => {
    const column = prev.column;
    const columnName = prev.columnName;
    if (column.memoize === false) {
        return false;
    }
    if (column.component) {
        return false;
    }
    if (isPropertyFk(column)) {
        return false;
    }
    return prev.row[columnName] === next.row[columnName];
});
