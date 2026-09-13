import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import Message from './Message';
export default function ErrorMessage(props) {
    const { message } = props;
    return _jsx(StyledErrorMessage, { message: message });
}
const StyledErrorMessage = styled((props) => {
    const { message } = props;
    return _jsx(Message, { message: message, Icon: ErrorIcon });
})(({ theme }) => {
    return {
        backgroundColor: theme.palette.error.dark,
        color: 'white',
    };
});
