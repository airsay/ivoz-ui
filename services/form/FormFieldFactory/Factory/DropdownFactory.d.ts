/// <reference types="react" />
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { ScalarProperty } from '../../../api';
import { ScalarEntityValue } from '../../../entity';
import { NullableFormFieldFactoryChoices } from '../FormFieldFactory';
declare type DropdownFactoryPropsType = {
    fld: string;
    property: ScalarProperty;
    disabled: boolean;
    value: ScalarEntityValue | Array<ScalarEntityValue>;
    hasChanged: boolean;
    error: React.ReactNode;
    touched: boolean | undefined;
    choices: NullableFormFieldFactoryChoices;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
export declare const DropdownFactory: (props: DropdownFactoryPropsType) => JSX.Element;
export {};
