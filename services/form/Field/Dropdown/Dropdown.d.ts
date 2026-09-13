import { JSXElementConstructor, ReactElement } from 'react';
export declare type DropdownArrayChoice = {
    label: string | React.ReactElement<any>;
    id: string | number;
    extraData?: Record<string, unknown>;
};
export declare type DropdownArrayChoices = Array<DropdownArrayChoice>;
export declare type DropdownObjectChoices = {
    [label: string | number]: string | React.ReactElement<any>;
};
export declare type DropdownChoices = DropdownObjectChoices | DropdownArrayChoices;
export interface SelectProps {
    className?: string;
    name: string;
    label: string | ReactElement<any, string | JSXElementConstructor<any>>;
    value: any;
    required: boolean;
    disabled: boolean;
    onChange: (event: any) => void;
    onBlur: (event: React.FocusEvent) => void;
    hasChanged: boolean;
    choices: DropdownChoices;
    error?: boolean;
    errorMsg?: React.ReactNode;
    helperText?: string | React.ReactNode;
    multiple?: boolean;
}
declare const Dropdown: (props: SelectProps) => JSX.Element;
export default Dropdown;
