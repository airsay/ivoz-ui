import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import { Typography, Grid } from '@mui/material';
export const StyledGroupLegend = styled((props) => {
    const { children, className } = props;
    return (_jsx(Typography, Object.assign({ variant: 'h6', color: 'inherit', gutterBottom: true, className: className }, { children: children })));
})(() => {
    return {
        marginBottom: '40px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--color-border)',
    };
});
export const StyledGroupGrid = styled((props) => {
    const { children, className } = props;
    return (_jsx(Grid, Object.assign({ container: true, spacing: 3, className: className }, { children: children })));
})(({ theme }) => {
    return {
        [theme.breakpoints.up('md')]: {
            paddingLeft: '15px',
        },
        marginBottom: '15px',
    };
});
