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
import { jsx as _jsx } from "react/jsx-runtime";
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { styled, Typography } from '@mui/material';
import HistoryTrackerLink from '../../../../shared/HistoryTrackerLink';
const linkStyles = {
    textDecoration: 'none',
    display: 'flex',
    color: 'currentColor',
};
export const StyledCollapsedBreadcrumbsLink = styled((props) => {
    const { className, children, to } = props, rest = __rest(props, ["className", "children", "to"]);
    return (_jsx(HistoryTrackerLink, Object.assign({ className: className, to: to }, rest, { children: children })));
})(() => {
    return Object.assign({}, linkStyles);
});
export const StyledCollapsedBreadcrumbsTypography = styled((props) => {
    const { className, children } = props, rest = __rest(props, ["className", "children"]);
    return (_jsx(Typography, Object.assign({ className: className }, rest, { children: children })));
})(() => {
    return Object.assign({}, linkStyles);
});
export const StyledCollapsedBreadcrumbsNavigateNextIcon = styled((props) => {
    const { className } = props;
    return _jsx(NavigateNextRoundedIcon, { fontSize: 'small', className: className });
})(() => {
    return Object.assign({}, linkStyles);
});
