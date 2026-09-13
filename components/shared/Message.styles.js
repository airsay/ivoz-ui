import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
export const StyledCloseIcon = styled(CloseIcon)(() => {
    return {
        position: 'relative',
    };
});
export const StyledSnackbarContentMessageContainer = styled((props) => {
    const { children, className } = props;
    return _jsx("span", Object.assign({ className: className }, { children: children }));
})(() => {
    return {
        display: 'flex',
        alignItems: 'center',
    };
});
