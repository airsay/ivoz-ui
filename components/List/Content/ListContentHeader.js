import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import AddIcon from '@mui/icons-material/Add';
import TuneRoundedIcon from '@mui/icons-material/TuneRounded';
import { Badge, Box, Tooltip } from '@mui/material';
import { forwardRef, useState } from 'react';
import { useStoreState } from 'store';
import { SolidButton, TonalButton, } from '../../../components/shared/Button/Button.styles';
import _ from '../../../services/translations/translate';
import { ContentFilterDialog } from '../Filter/ContentFilterDialog';
import DeleteRowsButton from './CTA/DeleteRowsButton';
import { StyledActionButtonContainer, StyledLink } from './ListContent.styles';
import { MultiselectMoreChildEntityLinks } from './Shared/MultiselectMoreChildEntityLinks';
import { StyledFastSearchField } from './FastSearchField.styles';
const ListContentHeader = (props, ref) => {
    const { path, entityService, ignoreColumn, preloadData, cancelToken, match, location, selectedValues, parentRow, mobile, } = props;
    const entity = entityService.getEntity();
    const disableMultiDelete = entity.deleteDoubleCheck === true || entity.disableMultiDelete === true;
    const acl = entityService.getAcls(parentRow);
    const [anchorEl, setAnchorEl] = useState(null);
    const rows = useStoreState((state) => state.list.rows);
    const globalAndMultiselectActions = Object.values(entity.customActions).filter((action) => action.multiselect || action.global);
    const multiselectOrGlobal = acl.delete === true || globalAndMultiselectActions.length > 0;
    let actionNum = globalAndMultiselectActions.length;
    if (acl.delete) {
        actionNum++;
    }
    const handleOpenMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const queryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    return (_jsxs(StyledActionButtonContainer, Object.assign({ ref: ref, className: 'list-content-header' }, { children: [_jsxs(Box, Object.assign({ className: 'buttons start' }, { children: [_jsx(StyledFastSearchField, { path: path, entityService: entityService, ignoreColumn: ignoreColumn }), _jsx(Tooltip, Object.assign({ title: _('Advanced search'), arrow: true }, { children: _jsx(Badge, Object.assign({ color: 'error', variant: 'dot', invisible: !mobile || queryStringCriteria.length == 0 }, { children: _jsx(TonalButton, Object.assign({ onClick: handleOpenMenu }, { children: _jsx(TuneRoundedIcon, {}) })) })) })), _jsx(Box, Object.assign({ className: 'filter-chips' }, { children: _jsx(ContentFilterDialog, { anchorEl: anchorEl, setAnchorEl: setAnchorEl, entityService: entityService, path: path, preloadData: preloadData, ignoreColumn: ignoreColumn, cancelToken: cancelToken, match: match }) }))] })), _jsxs(Box, Object.assign({ className: 'buttons end' }, { children: [multiselectOrGlobal &&
                        actionNum < 2 &&
                        globalAndMultiselectActions
                            .map((item) => item.action)
                            .map((Action, key) => {
                            return (_jsx(Action, { rows: rows, selectedValues: selectedValues, entityService: entityService }, key));
                        }), multiselectOrGlobal && actionNum > 1 && (_jsx(MultiselectMoreChildEntityLinks, { childActions: globalAndMultiselectActions, selectedValues: selectedValues, rows: rows, entityService: entityService, deleteMapItem: acl.delete &&
                            !disableMultiDelete && {
                            entity,
                            route: `${entity.path}/:id`,
                        } })), acl.delete && actionNum < 2 && !disableMultiDelete && (_jsx(DeleteRowsButton, { selectedValues: selectedValues, entityService: entityService })), acl.create && (_jsx(StyledLink, Object.assign({ to: `${location.pathname}/create` }, { children: _jsx(Tooltip, Object.assign({ title: 'Add', enterTouchDelay: 0, arrow: true }, { children: _jsxs(SolidButton, { children: [_jsx(AddIcon, {}), !mobile && _('Add')] }) })) })))] }))] })));
};
export default forwardRef(ListContentHeader);
