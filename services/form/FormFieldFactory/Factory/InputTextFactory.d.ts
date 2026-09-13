/// <reference types="react" />
import { InputBaseComponentProps, OutlinedInputProps } from '@mui/material';
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { ScalarProperty } from '../../../api';
import { ScalarEntityValue } from '../../../entity';
declare type InputTextFactoryPropsType = {
    fld: string;
    property: ScalarProperty;
    disabled: boolean;
    value: ScalarEntityValue | Array<ScalarEntityValue>;
    hasChanged: boolean;
    error: React.ReactNode;
    touched: boolean | undefined;
    inputProps: InputBaseComponentProps;
    InputProps: Partial<OutlinedInputProps>;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
export declare const InputTextFactory: (props: InputTextFactoryPropsType) => JSX.Element;
export {};
