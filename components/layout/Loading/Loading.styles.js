import { jsx as _jsx } from "react/jsx-runtime";
import { LinearProgress } from '@mui/material';
import { forwardRef } from 'react';
export const StyledLinearProgress = forwardRef((props, ref) => {
    return (_jsx(LinearProgress, Object.assign({}, props, { color: 'primary', sx: { height: 2, position: 'absolute', width: '100%' }, ref: ref })));
});
StyledLinearProgress.displayName = 'StyledLinearProgress';
