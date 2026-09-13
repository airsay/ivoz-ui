import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import HistoryTrackerLink from '../../components/shared/HistoryTrackerLink';
const StyledDashboardLink = styled((props) => {
    const { children, className, to } = props;
    return (_jsx(HistoryTrackerLink, Object.assign({ to: to, className: className }, { children: children })));
})(({ theme }) => {
    return {
        color: theme.palette.primary.dark,
        textDecoration: 'none',
    };
});
export default StyledDashboardLink;
