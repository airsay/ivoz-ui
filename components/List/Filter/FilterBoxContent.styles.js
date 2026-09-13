import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import { AppBar, Typography, Toolbar } from '@mui/material';
import FilterBoxContent from './FilterBoxContent';
export const StyledAppBar = styled(AppBar)(() => {
    return {
        position: 'relative',
    };
});
export const StyledFilterDialogTypography = styled((props) => {
    const { children, className } = props;
    return (_jsx(Typography, Object.assign({ variant: 'h6', className: className }, { children: children })));
})(({ theme }) => {
    return {
        marginLeft: theme.spacing(2),
        flex: 1,
    };
});
export const StyledFilterBoxContent = styled(FilterBoxContent)(() => {
    return {
        paddingTop: '65px',
        maxWidth: '450px',
    };
});
export const StyledToolbar = styled(Toolbar)(() => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
    };
});
