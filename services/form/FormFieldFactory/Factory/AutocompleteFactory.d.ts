/// <reference types="react" />
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { PropertySpec } from '../../../api';
import { ScalarEntityValue } from '../../../entity';
import { NullableFormFieldFactoryChoices } from '../FormFieldFactory';
declare type AutocompleteFactoryPropsType = {
    fld: string;
    property: PropertySpec;
    disabled: boolean;
    multiSelect: boolean;
    value: ScalarEntityValue | Array<ScalarEntityValue>;
    hasChanged: boolean;
    error: React.ReactNode;
    touched: boolean | undefined;
    choices: NullableFormFieldFactoryChoices;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
export declare const AutocompleteFactory: (props: AutocompleteFactoryPropsType) => JSX.Element;
export {};
