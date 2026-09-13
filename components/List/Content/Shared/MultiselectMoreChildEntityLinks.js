import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DeleteRowsButton from '../CTA/DeleteRowsButton';
import { MoreChildEntityLinksWrapper } from './MoreChildEntityLinksWrapper';
export const MultiselectMoreChildEntityLinks = (props) => {
    const { childActions, rows, entityService, deleteMapItem, selectedValues } = props;
    const hasGlobalActions = childActions.find((item) => item.global === true);
    const disabled = selectedValues.length === 0 && !hasGlobalActions;
    return (_jsxs(MoreChildEntityLinksWrapper, Object.assign({ disabled: disabled }, { children: [childActions
                .map((item) => item.action)
                .map((Action, key) => {
                return (_jsx(Action, { rows: rows, selectedValues: selectedValues, entityService: entityService, variant: 'text' }, key));
            }), deleteMapItem && (_jsx(DeleteRowsButton, { selectedValues: selectedValues, entityService: entityService, variant: 'text' }))] })));
};
