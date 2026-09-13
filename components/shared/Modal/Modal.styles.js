import { Box, DialogContent, DialogActions, } from '@mui/material';
import { styled } from '@mui/styles';
export const StyledDialogContentBody = styled(Box)(({ sx }) => {
    const resolvedStyles = Object.assign({ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-md)' }, sx);
    return resolvedStyles;
});
export const StyledDialogContent = styled(DialogContent)(() => {
    return {
        minWidth: '350px',
    };
});
export const StyledDialogActions = styled(DialogActions)(() => {
    return {
        padding: 0,
        marginTop: '10px',
    };
});
