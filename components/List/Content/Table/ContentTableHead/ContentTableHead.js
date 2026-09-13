import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel, } from '@mui/material';
import { isPropertyFk } from '../../../../../services/api/ParsedApiSpecInterface';
import { useStoreActions, useStoreState } from '../../../../../store';
import { ROUTE_ORDER_KEY } from '../../../../../store/route';
import { StyledTableSortLabelVisuallyHidden } from './ContentTableHead.styles';
const ContentTableHead = function (props) {
    const { entityService, ignoreColumn, multiselect, selectAll, checked, indeterminateSelectAll, } = props;
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getCollectionColumns(storeState);
    const order = useStoreState((state) => state.route.order);
    const direction = (order === null || order === void 0 ? void 0 : order.direction) || false;
    const replaceInQueryStringCriteria = useStoreActions((actions) => {
        return actions.route.replaceInQueryStringCriteria;
    });
    const setSort = (property, direction) => {
        const order = {
            name: ROUTE_ORDER_KEY,
            type: property,
            value: direction,
        };
        replaceInQueryStringCriteria(order);
    };
    const createSortHandler = (property) => () => {
        const isDesc = (order === null || order === void 0 ? void 0 : order.name) === property && direction === 'desc';
        setSort(property, isDesc ? 'asc' : 'desc');
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let selectableIdx = 0;
    return (_jsx(TableHead, { children: _jsxs(TableRow, { children: [multiselect && (_jsx(TableCell, { children: _jsx(Checkbox, { checked: checked, onChange: selectAll, indeterminate: indeterminateSelectAll }) })), Object.keys(columns).map((key) => {
                    if (key === ignoreColumn) {
                        selectableIdx++;
                        return null;
                    }
                    return (_jsxs(TableCell, Object.assign({ align: 'left', sortDirection: (order === null || order === void 0 ? void 0 : order.name) === key ? direction : false }, { children: [!isPropertyFk(columns[key]) && (_jsxs(TableSortLabel, Object.assign({ active: (order === null || order === void 0 ? void 0 : order.name) === key, direction: order === null || order === void 0 ? void 0 : order.direction, onClick: createSortHandler(key) }, { children: [columns[key].label, (order === null || order === void 0 ? void 0 : order.name) === key ? (_jsx(StyledTableSortLabelVisuallyHidden, { children: (order === null || order === void 0 ? void 0 : order.direction) === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending' })) : null] }))), isPropertyFk(columns[key]) && (_jsxs(_Fragment, { children: [columns[key].label, (order === null || order === void 0 ? void 0 : order.name) === key ? (_jsx(StyledTableSortLabelVisuallyHidden, { children: (order === null || order === void 0 ? void 0 : order.direction) === 'desc'
                                            ? 'sorted descending'
                                            : 'sorted ascending' })) : null] }))] }), key));
                }), _jsx(TableCell, { className: 'actions-cell' }, 'empty slot')] }) }));
};
export default ContentTableHead;
