import { InputProps } from '@mui/material';
import React, { JSXElementConstructor, ReactElement } from 'react';
import { DropdownChoices } from '../Dropdown';
import { SelectOptionsType } from 'entities/EntityInterface';
import { FormOnChangeEvent } from 'entities/DefaultEntityBehavior/Form/Form';
export interface DynamicAutocompleteProps {
    choices: DropdownChoices;
    selectOptions?: SelectOptionsType;
    nullOption?: string | React.ReactElement<any>;
    className?: string;
    name: string;
    label: string | ReactElement<any, string | JSXElementConstructor<any>>;
    placeholder?: string;
    value: any;
    multiple: boolean;
    required: boolean;
    disabled: boolean;
    onBlur: (event: React.FocusEvent) => void;
    error?: boolean;
    errorMsg?: React.ReactNode;
    helperText?: string | React.ReactNode;
    hasChanged: boolean;
    InputProps?: Partial<InputProps>;
    onChange: (event: FormOnChangeEvent) => void;
}
declare const DynamicAutocomplete: (props: DynamicAutocompleteProps) => JSX.Element | null;
export default DynamicAutocomplete;
