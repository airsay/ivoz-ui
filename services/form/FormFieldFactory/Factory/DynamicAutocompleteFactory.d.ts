/// <reference types="react" />
import { PropertySpec } from '../../../api';
import { ScalarEntityValue } from '../../../entity';
import { FormOnChangeEvent } from 'entities/DefaultEntityBehavior/Form/Form';
import EntityService from 'services/entity/EntityService';
import { NullableFormFieldFactoryChoices } from 'services/form';
declare type DynamicAutocompleteFactoryPropsType = {
    fld: string;
    property: PropertySpec;
    disabled: boolean;
    multiSelect: boolean;
    value: ScalarEntityValue | Array<ScalarEntityValue>;
    choices: NullableFormFieldFactoryChoices;
    hasChanged: boolean;
    error: React.ReactNode;
    touched: boolean | undefined;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
    entityService: EntityService;
};
export declare const DynamicAutocompleteFactory: (props: DynamicAutocompleteFactoryPropsType) => JSX.Element;
export {};
