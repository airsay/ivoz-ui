/// <reference types="react" />
import { OutlinedInputProps } from '@mui/material';
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { ScalarProperty } from '../../../api';
import { ScalarEntityValue } from '../../../entity';
declare type DateFactoryPropsType = {
    fld: string;
    property: ScalarProperty;
    disabled: boolean;
    value: ScalarEntityValue | Array<ScalarEntityValue>;
    hasChanged: boolean;
    error: React.ReactNode;
    touched: boolean | undefined;
    InputProps: Partial<OutlinedInputProps>;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
export declare const DateFactory: (props: DateFactoryPropsType) => JSX.Element;
export {};
