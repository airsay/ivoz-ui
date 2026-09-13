import { Box } from '@mui/material';
import { styled } from '@mui/styles';
export const StyledDialogContentBody = styled(Box)(({ sx }) => {
    const resolvedStyles = Object.assign({ display: 'flex', alignItems: 'center', justifyContent: 'center' }, sx);
    return resolvedStyles;
});
