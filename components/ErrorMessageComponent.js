import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ErrorIcon from '@mui/icons-material/Error';
const ErrorMessageComponent = (props) => {
    const { message } = props;
    return (_jsxs("span", { children: [_jsx(ErrorIcon, { sx: {
                    verticalAlign: 'bottom',
                } }), message !== null && message !== void 0 ? message : 'There was a problem'] }));
};
export default ErrorMessageComponent;
