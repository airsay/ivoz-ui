import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import DashboardItemList from './DashboardItemList';
const DashboardBlock = (props) => {
    const { label, children } = props.routeMapBlock;
    if (label) {
        return (_jsx(Grid, Object.assign({ item: true, lg: 4, md: 6, xs: 12, style: { marginTop: '15px' } }, { children: _jsx("ul", { children: _jsxs("li", Object.assign({ className: 'submenu' }, { children: [_jsxs("h3", { children: [_jsx(SettingsIcon, {}), label] }), _jsx("div", { children: _jsx(DashboardItemList, { items: children || [] }) })] })) }) })));
    }
    return (_jsx(Grid, Object.assign({ item: true, lg: 4, md: 6, xs: 12 }, { children: _jsx(DashboardItemList, { items: children || [] }) })));
};
export default DashboardBlock;
