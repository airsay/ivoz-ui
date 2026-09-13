import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import StyledDashboardLink from './DashboardItemList.styles';
import { isActionItem } from '../../router/routeMapParser';
const DashboardItemList = (props) => {
    const { items } = props;
    return (_jsx("ul", { children: items.map((item, key) => {
            if (isActionItem(item)) {
                return null;
            }
            const { route, entity } = item;
            if (!entity) {
                return null;
            }
            return (_jsx("li", { children: _jsx(StyledDashboardLink, Object.assign({ to: route || '' }, { children: _jsxs(_Fragment, { children: [_jsx(entity.icon, {}), entity.title] }) })) }, key));
        }) }));
};
export default DashboardItemList;
