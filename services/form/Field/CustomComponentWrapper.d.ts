/// <reference types="react" />
import { FormikComputedProps, FormikHandlers, FormikHelpers, FormikState } from 'formik';
import { FormOnChangeEvent } from '../../../entities/DefaultEntityBehavior';
import { PropertySpec } from '../../api/ParsedApiSpecInterface';
import FormFieldFactory, { NullableFormFieldFactoryChoices } from '../FormFieldFactory';
export declare enum CustomFunctionComponentContext {
    write = "write",
    read = "read"
}
export declare type CustomFunctionDefaultValues = Record<string, boolean | string | number | Record<string, unknown> | Array<string>>;
export interface PropertyCustomFunctionComponentProps<FormikValues, CustomComponentValues = CustomFunctionDefaultValues> {
    className?: string;
    _context?: CustomFunctionComponentContext;
    _columnName: string;
    readOnly: boolean;
    formik?: FormikState<FormikValues> & FormikComputedProps<FormikValues> & FormikHelpers<FormikValues> & FormikHandlers;
    values: CustomComponentValues;
    choices: NullableFormFieldFactoryChoices;
    changeHandler: (event: FormOnChangeEvent) => void;
    onBlur: (event: React.FocusEvent) => void;
    property: PropertySpec;
    disabled: boolean;
    hasChanged: boolean;
    formFieldFactory?: FormFieldFactory;
}
export declare type PropertyCustomFunctionComponent<T extends PropertyCustomFunctionComponentProps<any>> = React.FunctionComponent<T>;
interface CustomComponentWrapperProps {
    property: PropertySpec;
    hasChanged: boolean;
    children: React.ReactNode;
    disabled: boolean;
}
export declare const CustomComponentWrapper: React.FunctionComponent<CustomComponentWrapperProps>;
declare const withCustomComponentWrapper: <V, T extends PropertyCustomFunctionComponentProps<any, CustomFunctionDefaultValues> = PropertyCustomFunctionComponentProps<V, CustomFunctionDefaultValues>>(InnerComponent: React.FunctionComponent<any>) => PropertyCustomFunctionComponent<T>;
export default withCustomComponentWrapper;
