import { InputProps } from '@mui/material';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { DropdownChoices } from '../Dropdown';
export interface AutocompleteProps {
    className?: string;
    name: string;
    label: string | ReactElement<any, string | JSXElementConstructor<any>>;
    placeholder?: string;
    value: any;
    multiple: boolean;
    required: boolean;
    disabled: boolean;
    onChange: (event: any) => void;
    onBlur: (event: React.FocusEvent) => void;
    choices: DropdownChoices;
    error?: boolean;
    errorMsg?: React.ReactNode;
    helperText?: string | React.ReactNode;
    hasChanged: boolean;
    InputProps?: Partial<InputProps>;
    disableClearable?: boolean;
}
declare const Autocomplete: (props: AutocompleteProps) => JSX.Element | null;
export default Autocomplete;
