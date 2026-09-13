/// <reference types="react" />
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
export interface MessageProps {
    message: string;
    Icon: OverridableComponent<SvgIconTypeMap<any, 'svg'>>;
}
export default function Message(props: MessageProps): JSX.Element;
