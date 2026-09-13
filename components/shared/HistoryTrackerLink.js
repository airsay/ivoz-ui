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
import { forwardRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStoreActions } from '../../store';
const HistoryTrackerLink = forwardRef((props, ref) => {
    const { className, children, to, parentEntity, parentRow } = props, rest = __rest(props, ["className", "children", "to", "parentEntity", "parentRow"]);
    const location = useLocation();
    const setParentRow = useStoreActions((actions) => {
        return actions.list.setParentRow;
    });
    const state = {
        referrer: location.pathname + location.search,
    };
    if (parentEntity && parentRow) {
        state.referrerIden = parentEntity.toStr(parentRow);
    }
    const onClickHandler = () => {
        if (parentEntity && parentRow) {
            setParentRow(parentRow);
        }
    };
    return (_jsx(Link, Object.assign({ ref: ref, className: className, to: to, state: state }, rest, { onClick: onClickHandler }, { children: children })));
});
HistoryTrackerLink.displayName = 'HistoryTrackerLink';
export default HistoryTrackerLink;
