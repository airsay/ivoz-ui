import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Fade, Skeleton } from '@mui/material';
import { matchRoutes } from 'react-router-dom';
import { useStoreState } from 'store';
import { isPropertyFk, } from '../../../services/api/ParsedApiSpecInterface';
import { StyledCheckBoxIcon, StyledCheckBoxOutlineBlankIcon, StyledTableRowFkLink, } from './Table/ContentTable.styles';
import DownloadFile from '../DownloadFile';
const ListContentValue = (props) => {
    const { column, columnName, row, entityService } = props;
    const routes = useStoreState((state) => state.routes.routes);
    const ListDecorator = entityService.getListDecorator();
    const customComponent = column.component;
    const isDownloadable = column.downloadable;
    const isFileType = column.type === 'file';
    const isFk = isPropertyFk(column);
    const loadingFk = isFk &&
        column.type !== 'array' &&
        row[columnName] &&
        !row[`${columnName}Id`];
    const valuePath = columnName.split('.');
    const value = valuePath.length > 1
        ? row[valuePath.shift()][valuePath.shift()]
        : row[columnName];
    const isMultiSelect = column.type === 'array';
    const loadingMultiselect = isMultiSelect && Array.isArray(value);
    const loadingValue = loadingFk || loadingMultiselect;
    const enumValues = column.enum;
    const isBoolean = typeof value === 'boolean';
    let response = value;
    if (customComponent) {
        response = _jsx(ListDecorator, { field: columnName, row: row, property: column });
    }
    else if (isFk) {
        const nullValue = row[columnName] === null;
        const emptyValue = nullValue || (!row[columnName] && !row[`${columnName}Id`]);
        const preparedValue = Boolean(row[`${columnName}Id`]);
        if (nullValue) {
            return _jsx(_Fragment, { children: column.null });
        }
        else if (loadingValue ||
            (!isMultiSelect && !emptyValue && !preparedValue && !customComponent)) {
            response = (_jsx(Fade, Object.assign({ in: true, style: {
                    transitionDelay: '1000ms',
                }, unmountOnExit: true }, { children: _jsx(Skeleton, { variant: 'text' }) })));
        }
        else if (row[`${columnName}Link`]) {
            const routeExists = matchRoutes(routes, row[`${columnName}Link`]);
            if (!routeExists) {
                return value;
            }
            response = (_jsx(StyledTableRowFkLink, Object.assign({ to: row[`${columnName}Link`] }, { children: value })));
        }
    }
    else if (isBoolean && !enumValues && value) {
        response = _jsx(StyledCheckBoxIcon, {});
    }
    else if (isBoolean && !enumValues) {
        response = _jsx(StyledCheckBoxOutlineBlankIcon, {});
    }
    else {
        response = (_jsx(ListDecorator, { field: columnName, row: row, property: column, entityPath: entityService.getEntity().path }));
    }
    if (isDownloadable && isFileType) {
        response = (_jsx(DownloadFile, { row: row, path: entityService.getEntity().path, fileType: columnName }));
    }
    const prefix = (column === null || column === void 0 ? void 0 : column.prefix) || '';
    return (_jsxs(Box, Object.assign({ component: 'span', className: 'cell' }, { children: [prefix, response] })));
};
export default ListContentValue;
