import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Message from './Message';
export default function InfoMessage(props) {
    const { message } = props;
    return _jsx(StyledInfoMessage, { message: message });
}
const StyledInfoMessage = styled((props) => {
    const { message } = props;
    return _jsx(Message, { message: message, Icon: InfoIcon });
})(() => {
    return {
        backgroundColor: '#616161',
        color: 'white',
    };
});
