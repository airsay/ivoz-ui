import { jsx as _jsx } from "react/jsx-runtime";
import Typography from '@mui/material/Typography';
export default function Title(props) {
    return (_jsx(Typography, Object.assign({ component: 'h2', variant: 'h6', color: 'inherit', gutterBottom: true }, { children: props.children })));
}
