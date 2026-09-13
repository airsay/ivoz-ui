import { jsx as _jsx } from "react/jsx-runtime";
import { FormControl } from '@mui/material';
export const SwitchFormControl = (props) => {
    const { children, hasChanged } = props;
    let className = props.className;
    if (hasChanged) {
        className += ' changed';
    }
    return (_jsx(FormControl, Object.assign({ className: className, fullWidth: true }, { children: children })));
};
