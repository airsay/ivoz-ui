import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Collapse } from '@mui/material';
import { useState } from 'react';
import EditRowButton from '../CTA/EditRowButton';
import ViewRowButton from '../CTA/ViewRowButton';
import ChildEntityLinks from '../Shared/ChildEntityLinks';
import ContentCardRow from './ContentCardRow';
import { useStoreState } from '../../../../store';
const ContentCardBody = (props) => {
    const { visibleColumns, row, entityService, selectedValues, handleChange, childEntities, path, className, } = props;
    const [open, setOpen] = useState(false);
    const entity = entityService.getEntity();
    const ChildDecorator = entity.ChildDecorator;
    const parentRow = useStoreState((state) => state.list.parentRow);
    const acl = entityService.getAcls(parentRow);
    const multiselectActions = Object.values(entity.customActions)
        .filter((action) => action.multiselect || action.global)
        .map((item) => item.action);
    const multiselect = (entity.deleteDoubleCheck !== true && acl.delete === true) ||
        multiselectActions.length > 0;
    const updateRouteMapItem = {
        entity,
        route: `${entity.path}/:id/update`,
    };
    const detailMapItem = {
        entity,
        route: `${entity.path}/:id/detailed`,
    };
    const deleteMapItem = {
        entity,
        route: `${entity.path}/:id`,
        disabled: !acl.delete,
    };
    const localVisibleColumns = Object.assign({}, visibleColumns);
    const visibleColumnNames = Object.keys(localVisibleColumns);
    const firstColumnName = visibleColumnNames.shift();
    const firstColumn = localVisibleColumns[firstColumnName];
    delete localVisibleColumns[firstColumnName];
    const showDetail = acl.detail && !acl.update;
    return (_jsxs(Box, Object.assign({ className: className }, { children: [_jsx(ContentCardRow, { columnName: firstColumnName, multiselect: multiselect, isFirstRow: true, column: firstColumn, row: row, entityService: entityService, selectedValues: selectedValues, handleMultiselectChange: handleChange, expanded: open, setExpanded: setOpen }), _jsxs(Collapse, Object.assign({ in: open, timeout: 'auto', unmountOnExit: true }, { children: [visibleColumnNames.map((key, idx) => {
                        const column = visibleColumns[key];
                        return (_jsx(ContentCardRow, { columnName: key, multiselect: multiselect, isFirstRow: false, column: column, row: row, entityService: entityService, selectedValues: selectedValues, handleMultiselectChange: handleChange, expanded: false, setExpanded: () => {
                                /* noop */
                            } }, idx));
                    }), _jsx(Box, Object.assign({ className: 'actions' }, { children: _jsx(ChildEntityLinks, { childEntities: childEntities, entityService: entityService, row: row, detail: showDetail && (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: detailMapItem, row: row, entityService: entityService }, { children: _jsx(ViewRowButton, { row: row, path: path }) }))), edit: (acl.update || !showDetail) && (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: updateRouteMapItem, row: row, entityService: entityService, disabled: !acl.update }, { children: _jsx(EditRowButton, { disabled: !acl.update, row: row, path: path }) }))), deleteMapItem: deleteMapItem }) }))] }))] })));
};
export default ContentCardBody;
