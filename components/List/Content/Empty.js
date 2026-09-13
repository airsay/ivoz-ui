import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Link } from 'react-router-dom';
import _ from '../../../services/translations/translate';
import { SolidButton } from '../../shared/Button/Button.styles';
import { useTranslation } from 'react-i18next';
import { Box, Fade } from '@mui/material';
import { useStoreState } from '../../../store';
import { MultiselectMoreChildEntityLinks } from './Shared/MultiselectMoreChildEntityLinks';
export const Empty = (props) => {
    const { entityService, className } = props;
    const { t } = useTranslation();
    const entity = entityService.getEntity();
    const parentRow = useStoreState((state) => state.list.parentRow);
    const acls = entityService.getAcls(parentRow);
    const { create = false } = acls;
    let singularTitle, pluralTitle;
    const title = entity.title;
    if (typeof title === 'string') {
        singularTitle = pluralTitle = title.toLowerCase();
    }
    else {
        const translationKey = title.props.defaults;
        singularTitle = t(translationKey, { count: 1 }).toLowerCase();
        pluralTitle = t(translationKey, { count: 2 }).toLowerCase();
    }
    const globalActions = Object.values(entity.customActions).filter((action) => action.global);
    return (_jsx(Fade, Object.assign({ in: true, style: {
            transitionDelay: '750ms',
        }, unmountOnExit: true }, { children: _jsxs("section", Object.assign({ className: className }, { children: [_jsx("img", { src: 'assets/img/empty.svg', alt: '' }), _jsx("h3", { children: _('No {{entity}} yet', { entity: pluralTitle }) }), _jsx("p", { children: _("You haven't created any {{entity}} yet.", {
                        entity: singularTitle,
                    }) }), create && (_jsxs(Box, Object.assign({ className: 'empty-actions' }, { children: [globalActions &&
                            globalActions.length < 2 &&
                            globalActions
                                .map((item) => item.action)
                                .map((Action, key) => {
                                return (_jsx(Action, { rows: [], selectedValues: [], entityService: entityService }, key));
                            }), globalActions && globalActions.length > 1 && (_jsx(MultiselectMoreChildEntityLinks, { childActions: globalActions, selectedValues: [], rows: [], entityService: entityService })), _jsx(Link, Object.assign({ to: location.pathname + '/create' }, { children: _jsx(SolidButton, { children: _('New {{entity}}', { entity: singularTitle }) }) }))] })))] })) })));
};
export default Empty;
