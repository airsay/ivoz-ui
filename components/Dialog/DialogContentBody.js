import { jsx as _jsx } from "react/jsx-runtime";
import { StyledDialogContentBody } from './DialogContentBody.styles';
const DialogContentBody = (props) => {
    const { child, sx } = props;
    return (_jsx(StyledDialogContentBody, Object.assign({ sx: Object.assign({}, sx) }, { children: child })));
};
export default DialogContentBody;
