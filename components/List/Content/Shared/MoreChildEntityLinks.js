import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MenuItem from '@mui/material/MenuItem';
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
import { isActionItem, isEntityItem, isSingleRowActionItem, } from '../../../../router';
import DeleteRowButton from '../CTA/DeleteRowButton';
import { StyledTableRowChildEntityLink } from '../Table/ContentTable.styles';
import buildLink from './BuildLink';
import { MoreChildEntityLinksWrapper } from './MoreChildEntityLinksWrapper';
export const MoreMenuItem = MenuItem;
export const MoreChildEntityLinks = (props) => {
    var _a;
    const { childEntities, row, entityService, deleteMapItem } = props;
    const match = useCurrentPathMatch();
    const entity = entityService.getEntity();
    const ChildDecorator = entity.ChildDecorator;
    const isEditable = (_a = row.editable) !== null && _a !== void 0 ? _a : true;
    return (_jsxs(MoreChildEntityLinksWrapper, { children: [childEntities.map((routeMapItem, key) => {
                var _a;
                if (isActionItem(routeMapItem) &&
                    isSingleRowActionItem(routeMapItem, routeMapItem.action)) {
                    return (_jsx(routeMapItem.action, { match: match, row: row, entityService: entityService, variant: 'text' }, key));
                }
                if (!isEntityItem(routeMapItem)) {
                    return null;
                }
                const baseUrl = process.env.BASE_URL || '/';
                const title = routeMapItem.entity.title;
                const link = buildLink({
                    link: `${baseUrl}${(_a = routeMapItem.route) === null || _a === void 0 ? void 0 : _a.substring(1)}`,
                    id: `${row.id}`,
                    params: match.params,
                });
                return (_jsx(MoreMenuItem, { children: _jsx(ChildDecorator, Object.assign({ variant: 'text', routeMapItem: routeMapItem, row: row, entityService: entityService, disabled: routeMapItem.disabled }, { children: _jsx(StyledTableRowChildEntityLink, Object.assign({ to: link, parentEntity: entity, parentRow: row }, { children: title })) }), key) }, key));
            }), deleteMapItem && (_jsx(ChildDecorator, Object.assign({ variant: 'text', routeMapItem: deleteMapItem, row: row, entityService: entityService, disabled: deleteMapItem.disabled || !isEditable }, { children: _jsx(DeleteRowButton, { variant: 'text', row: row, entityService: entityService, disabled: (deleteMapItem === null || deleteMapItem === void 0 ? void 0 : deleteMapItem.disabled) || !isEditable }) })))] }));
};
