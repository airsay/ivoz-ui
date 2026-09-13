import { jsx as _jsx } from "react/jsx-runtime";
import { Box, styled, Typography } from '@mui/material';
export const StyledFilterDialogTypography = styled((props) => {
    const { children, className } = props;
    return (_jsx(Typography, Object.assign({ variant: 'h6', className: className }, { children: children })));
})(({ theme }) => {
    return {
        marginLeft: theme.spacing(2),
        flex: 1,
    };
});
export const StyledSketchPickerContainer = styled(Box)((props) => {
    const { visibility, mouseposition } = props;
    const marginStyles = { marginTop: -300 };
    if (mouseposition) {
        const { y } = mouseposition;
        if (y < -611) {
            marginStyles.marginTop = 50;
        }
    }
    return Object.assign({ visibility, position: 'absolute', zIndex: 9999 }, marginStyles);
});
export const StyledColorFactoryContainer = styled(Box)(() => {
    return {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 25,
    };
});
