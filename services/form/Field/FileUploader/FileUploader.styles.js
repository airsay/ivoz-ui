import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
export const StyledFileUploaderContainer = styled((props) => {
    const { children, className } = props;
    return _jsx("div", Object.assign({ className: className }, { children: children }));
})(() => {
    return {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--spacing-md)',
        padding: 'var(--spacing-sm)',
    };
});
export const StyledUploadButtonLabel = styled((props) => {
    const { children, className, htmlFor } = props;
    return (_jsx("label", Object.assign({ htmlFor: htmlFor, className: `${className} link` }, { children: children })));
})({
    marginBlock: 'var(--spacing-xs)',
    '&.upload-icon': {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
});
export const StyledFileNameContainer = styled('div')({
    color: '#B2B3B6',
    alignItems: 'center',
    display: 'flex',
    gap: 'var(--spacing-xs)',
    '&.disabled': {
        color: 'rgba(0, 0, 0, 0.5)',
    },
});
export const StyledImageContainer = styled('div')({
    '& svg': {
        fontSize: '100px',
        color: '#A3A4A8',
    },
});
export const StyledImagePreview = styled('img')(({ $isReadMode }) => ({
    maxWidth: $isReadMode ? '50px' : '200px',
    maxHeight: $isReadMode ? '50px' : '200px',
    width: 'auto',
    height: 'auto',
    objectFit: $isReadMode ? 'cover' : 'contain',
    cursor: $isReadMode ? '' : 'pointer',
}));
export const StyledTextContainer = styled('div')({
    color: '#B2B3B6',
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
});
