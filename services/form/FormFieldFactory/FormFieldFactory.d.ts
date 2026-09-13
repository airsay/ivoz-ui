import React from 'react';
import { FormOnChangeEvent } from '../../../entities/DefaultEntityBehavior';
import { PropertySpec } from '../../api/ParsedApiSpecInterface';
import EntityService from '../../entity/EntityService';
import { DropdownChoices } from '../Field/Dropdown/Dropdown';
import { useFormikType } from '../types';
export declare type NullableFormFieldFactoryChoices = null | DropdownChoices;
export default class FormFieldFactory {
    private entityService;
    formik: useFormikType;
    private changeHandler;
    private handleBlur;
    private divRef?;
    constructor(entityService: EntityService, formik: useFormikType, changeHandler: (event: FormOnChangeEvent) => void, handleBlur: (event: React.FocusEvent) => void, divRef?: React.RefObject<HTMLDivElement> | undefined);
    private getDynamicSelectOptions;
    private isDynamicAutocomplete;
    getFormField(fld: string, choices: NullableFormFieldFactoryChoices, readOnly?: boolean): JSX.Element | null;
    createByPropertySpec(fld: string, property: PropertySpec, choices: NullableFormFieldFactoryChoices, readOnly?: boolean): JSX.Element | null;
    getProperty(fld: string): PropertySpec | null;
    getInputField(fld: string, property: PropertySpec, choices: NullableFormFieldFactoryChoices, readOnly: boolean): JSX.Element;
    private parseInputFieldProperties;
}
