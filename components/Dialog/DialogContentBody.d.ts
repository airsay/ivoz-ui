/// <reference types="react" />
import { SxProps, Theme } from '@mui/material';
interface DialogContentProps {
    child: JSX.Element;
    sx?: SxProps<Theme>;
}
declare const DialogContentBody: (props: DialogContentProps) => JSX.Element;
export default DialogContentBody;
