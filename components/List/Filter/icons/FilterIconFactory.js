var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Contains from './contains';
import StartsWith from './startsWith';
import EndsWith from './endsWith';
import Equals from './equals';
import NotEquals from './notEquals';
import LowerThan from './lowerThan';
import LowerThanEqual from './lowerThanEqual';
import GreaterThan from './greaterThan';
import GreaterThanEqual from './greaterThanEqual';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BlockIcon from '@mui/icons-material/Block';
import RuleIcon from '@mui/icons-material/Rule';
import _ from '../../../../services/translations/translate';
import { styled } from '@mui/material';
export default function FilterIconFactory(props) {
    const { name, includeLabel, collection } = props, rest = __rest(props, ["name", "includeLabel", "collection"]);
    const icon = getFilterIcon(name);
    const StyledIcon = styled(icon)(() => {
        return {
            verticalAlign: 'bottom',
            paddingRight: '7px',
        };
    });
    if (!includeLabel) {
        return _jsx(StyledIcon, Object.assign({}, rest));
    }
    return (_jsxs("span", { children: [_jsx(StyledIcon, Object.assign({}, rest)), getFilterLabel(name, collection)] }));
}
const getFilterIcon = (name) => {
    switch (name) {
        case 'exists':
            return AssignmentTurnedInIcon;
        case 'partial':
            return Contains;
        case 'start':
            return StartsWith;
        case 'end':
            return EndsWith;
        case '':
        case 'in':
            return Equals;
        case 'all':
            return DoneAllIcon;
        case 'none':
            return BlockIcon;
        case 'only':
            return RuleIcon;
        case 'exact':
        case 'eq':
            return Equals;
        case 'neq':
            return NotEquals;
        case 'strictly_before':
        case 'lt':
            return LowerThan;
        case 'before':
        case 'lte':
            return LowerThanEqual;
        case 'strictly_after':
        case 'gt':
            return GreaterThan;
        case 'after':
        case 'gte':
            return GreaterThanEqual;
        case 'between':
            return Contains;
        default:
            const error = { error: `Icon ${name} was not found` };
            throw error;
    }
};
export const getFilterLabel = (value, collection = false) => {
    if (collection && (value === 'in' || value === '' || value === 'exact')) {
        return _('Has any of');
    }
    const filterTypes = {
        '': _('Equals'),
        in: _('Equals'),
        all: _('Has all of'),
        none: _('Has none of'),
        only: _('Has exactly'),
        eq: _('Equals'),
        exact: _('Equals'),
        neq: _('Does not Equal'),
        start: _('Starts with'),
        partial: _('Contains'),
        end: _('Ends with'),
        gt: _('Is greater than'),
        between: _('Between'),
        gte: _('Is greater than equal'),
        after: _('Is greater than equal'),
        strictly_after: _('Is greater than'),
        lt: _('Is lower than'),
        lte: _('Is lower than equal'),
        before: _('Is lower than equal'),
        strictly_before: _('Is lower than'),
        exists: _('Exists'),
    };
    return filterTypes[value];
};
