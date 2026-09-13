/// <reference types="react" />
import { TextFieldProps as MuiTextFieldProps } from '@mui/material';
export declare type TextFieldProps = MuiTextFieldProps & {
    hasChanged: boolean;
    margin?: 'dense' | 'none';
    size?: 'small' | 'medium';
    errorMsg?: React.ReactNode;
    className?: string;
};
export declare const TextField: (props: TextFieldProps) => JSX.Element;
