import React from 'react';
import { VisualToggleStates } from '../../../services/entity/EntityService';
import FormFieldFactory from '../../../services/form/FormFieldFactory';
import { FkChoices, ReadOnlyProperties } from './Form';
import { FieldsetGroupsField } from '../FilterFieldsetGroups';
export declare type EntityFormFieldProps = {
    column: FieldsetGroupsField;
    fkChoices?: FkChoices;
    visualToggles: VisualToggleStates;
    readOnlyProperties?: ReadOnlyProperties;
    formFieldFactory: FormFieldFactory;
};
export declare type EntityFormFieldType = (props: EntityFormFieldProps) => JSX.Element | null;
export declare const FormField: EntityFormFieldType;
declare const FormFieldMemo: React.MemoExoticComponent<EntityFormFieldType>;
export default FormFieldMemo;
