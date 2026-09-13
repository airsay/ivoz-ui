import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import MuiBreadcrumbs from '@mui/material/Breadcrumbs';
import { useStoreState } from 'store';
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
import useRouteChain from '../../../../hooks/useRouteChain';
import _ from '../../../../services/translations/translate';
import { StyledCollapsedBreadcrumbsLink, StyledCollapsedBreadcrumbsNavigateNextIcon, StyledCollapsedBreadcrumbsTypography, } from './styles/Links.styles';
import useParentRow from '../../../../hooks/useParentRow';
import { useTranslation } from 'react-i18next';
const getEntityItemLink = (routeItem, match) => {
    var _a;
    const baseUrl = process.env.BASE_URL || '/';
    let to = `${baseUrl}${(_a = routeItem.route) === null || _a === void 0 ? void 0 : _a.substring(1)}` || '/';
    for (const idx in match.params) {
        const val = match.params[idx];
        to = to.replace(`:${idx}`, val);
    }
    return to;
};
const Breadcrumbs = (props) => {
    const { routeMap, desktop = true } = props;
    const match = useCurrentPathMatch();
    const formRow = useStoreState((state) => state.form.row);
    const { i18n } = useTranslation();
    const routeItems = useRouteChain({
        routeMap,
        match,
    });
    const lastPathSegment = match.pathname.split('/').pop();
    const showEntityToStr = ['detailed', 'update'].includes(lastPathSegment);
    const lastRouteItem = routeItems[routeItems.length - 1];
    const entity = lastRouteItem ? lastRouteItem.entity : undefined;
    const appendOnEdit = showEntityToStr && entity && formRow ? entity.toStr(formRow) : '';
    const appendOnNew = lastPathSegment === 'create' ? _('New') : '';
    const appendSegment = appendOnEdit || appendOnNew;
    if (routeItems.length === 0) {
        return null;
    }
    if (!desktop) {
        let routeItem = routeItems.pop();
        const title = routeItem.entity.title;
        let baseUrl = process.env.BASE_URL || '';
        if (baseUrl.slice(-1) === '/') {
            baseUrl = baseUrl.substring(0, baseUrl.length - 1);
        }
        if (baseUrl + routeItem.route === match.pattern.path &&
            routeItems.length > 0) {
            routeItem = routeItems[routeItems.length - 1];
        }
        const to = routeItems.length > 0 ? getEntityItemLink(routeItem, match) : baseUrl;
        return (_jsxs(StyledCollapsedBreadcrumbsLink, Object.assign({ className: 'back-mobile', to: to }, { children: [_jsx(NavigateBeforeRoundedIcon, {}), " ", appendSegment || title] })));
    }
    const breadcrumbs = [];
    routeItems.forEach((routeItem, key) => {
        const to = getEntityItemLink(routeItem, match);
        const entity = routeItem.entity;
        const isLast = key + 1 === routeItems.length;
        const params = Object.values(match.params);
        const entityId = params[key];
        const currentLang = i18n.resolvedLanguage;
        const element = (_jsxs("span", Object.assign({ style: { display: 'flex', gap: '12px' } }, { children: [_jsx(StyledCollapsedBreadcrumbsLink, Object.assign({ to: to }, { children: entity.title })), isLast && entity.link && !appendSegment && (_jsx("a", Object.assign({ target: '_blank', href: entity.link.replace('${language}', currentLang || 'en'), rel: 'noreferrer', style: { height: '24px' } }, { children: _jsx("img", { src: 'assets/img/breadcrumb-link.svg' }) })))] }), key));
        breadcrumbs.push(element);
        if (isLast || !entityId) {
            return;
        }
        breadcrumbs.push(_jsx(BreadcrumbItem, { entity: entity, id: entityId }, key));
    });
    return (_jsxs(MuiBreadcrumbs, Object.assign({ separator: _jsx(StyledCollapsedBreadcrumbsNavigateNextIcon, {}), "aria-label": 'breadcrumb' }, { children: [breadcrumbs, appendSegment && (_jsx(StyledCollapsedBreadcrumbsTypography, { children: appendSegment }))] })));
};
const BreadcrumbItem = ({ entity, id }) => {
    const item = useParentRow({
        parentEntity: entity,
        parentId: id,
    });
    if (!item) {
        return _jsx(_Fragment, {});
    }
    return (_jsx(StyledCollapsedBreadcrumbsTypography, { children: entity.toStr(item) }));
};
export default Breadcrumbs;
