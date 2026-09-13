/// <reference types="react" />
import { InputBaseComponentProps, OutlinedInputProps } from '@mui/material';
import { useFormikType } from 'services/form/types';
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { EmbeddableProperty, PropertyList } from '../../../api';
declare type MultilangFactoryPropsType = {
    fld: string;
    property: EmbeddableProperty;
    properties: PropertyList;
    disabled: boolean;
    hasChanged: boolean;
    inputProps: InputBaseComponentProps;
    InputProps: Partial<OutlinedInputProps>;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
    formik: useFormikType;
};
export declare const MultilangFactory: (props: MultilangFactoryPropsType) => JSX.Element;
export {};
