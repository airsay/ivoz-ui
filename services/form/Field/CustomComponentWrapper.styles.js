import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import CloseIcon from '@mui/icons-material/Close';
import { FormControl, styled } from '@mui/material';
export const StyledCloseIcon = styled(CloseIcon)(() => {
    return {
        position: 'relative',
    };
});
export const StyledFieldsetRoot = styled((props) => {
    const { children, label, hasChanged, disabled, required } = props;
    const { handleDrop, handleDragEnter, handleDragLeave, handleDragOver } = props;
    let className = props.className;
    if (hasChanged) {
        className += ' changed';
    }
    if (disabled) {
        className += ' disabled';
    }
    return (_jsxs(FormControl, Object.assign({ variant: 'standard', fullWidth: true, className: className }, { children: [label && (_jsxs("label", { children: [label, required && '*'] })), _jsx("div", Object.assign({ className: 'fieldsetContainer', onDrop: handleDrop, onDragEnter: handleDragEnter, onDragLeave: handleDragLeave, onDragOver: handleDragOver }, { children: children }))] })));
})(() => {
    return {
        '& fieldset': {
            padding: '10px 10px 5px',
        },
        '&.multilang fieldset': {
            border: 'none',
            margin: '0',
            padding: '0',
        },
        '&.multilang label': {
            fontSize: '13px',
        },
    };
});
export const StyledFieldset = styled((props) => {
    const { children, className } = props;
    return (_jsx("fieldset", Object.assign({ className: className }, { children: _jsx("div", Object.assign({ className: 'customComponentContainer' }, { children: children })) })));
})(({ theme }) => {
    const borderColor = theme.palette.mode === 'light'
        ? 'rgba(0, 0, 0, 0.23)'
        : 'rgba(255, 255, 255, 0.23)';
    return {
        position: 'relative',
        borderWidth: '1px',
        borderRadius: theme.shape.borderRadius,
        borderColor: borderColor,
        '& > legend': {
            visibility: 'hidden',
            fontSize: '0.8rem',
        },
        '& .customComponentContainer': {
            fontSize: '1rem',
            color: theme.palette.text.secondary,
            padding: '0px 0 7px',
        },
    };
});
