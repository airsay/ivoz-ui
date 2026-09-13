import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
import { isActionItem, isEntityItem, isSingleRowActionItem, } from '../../../../router/routeMapParser';
import DeleteRowButton from '../CTA/DeleteRowButton';
import ChildEntityLink from './ChildEntityLink';
import { MoreChildEntityLinks } from './MoreChildEntityLinks';
const ChildEntityLinks = (props) => {
    var _a;
    const { entityService, childEntities, row, detail, edit, deleteMapItem } = props;
    const match = useCurrentPathMatch();
    const entity = entityService.getEntity();
    const ChildDecorator = entity.ChildDecorator;
    let firstActionButtonNum = 0;
    if (detail || edit) {
        firstActionButtonNum = 1;
    }
    const childEntitiesCopy = childEntities.filter((child) => {
        return !child.global;
    });
    const visibleChildEntities = childEntitiesCopy.splice(0, 2 - firstActionButtonNum);
    const isEditable = (_a = row.editable) !== null && _a !== void 0 ? _a : true;
    return (_jsxs(_Fragment, { children: [detail, edit, visibleChildEntities.map((routeMapItem, key) => {
                if (isActionItem(routeMapItem) &&
                    isSingleRowActionItem(routeMapItem, routeMapItem.action)) {
                    return (_jsx(routeMapItem.action, { match: match, row: row, entityService: entityService }, key));
                }
                if (!isEntityItem(routeMapItem)) {
                    return null;
                }
                return (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: routeMapItem, row: row, entityService: entityService, disabled: routeMapItem.disabled }, { children: _jsx(ChildEntityLink, { routeMapItem: routeMapItem, row: row }) }), key));
            }), childEntitiesCopy.length === 0 && deleteMapItem && (_jsx(ChildDecorator, Object.assign({ variant: 'icon', routeMapItem: deleteMapItem, row: row, entityService: entityService, disabled: deleteMapItem.disabled || !isEditable }, { children: _jsx(DeleteRowButton, { disabled: deleteMapItem.disabled || !isEditable, row: row, entityService: entityService }) }))), childEntitiesCopy.length > 0 && (_jsx(MoreChildEntityLinks, { childEntities: childEntitiesCopy, row: row, entityService: entityService, deleteMapItem: deleteMapItem }))] }));
};
export default ChildEntityLinks;
