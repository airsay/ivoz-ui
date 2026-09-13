/// <reference types="react" />
import { FormikHelpers } from 'formik';
import { PathMatch } from 'react-router-dom';
import { FilterValuesType } from '../../../router/routeMapParser';
import { DropdownChoices, ScalarEntityValue, useFormikType } from '../../../services';
import EntityService, { EntityValues } from '../../../services/entity/EntityService';
import EntityInterface from '../../EntityInterface';
import { FieldsetGroups } from '../FilterFieldsetGroups';
export declare type FormOnChangeEvent = React.ChangeEvent<{
    name: string;
    value: any;
}>;
export declare type PropertyFkChoices = DropdownChoices;
export declare type NullablePropertyFkChoices = null | PropertyFkChoices;
export declare type FkChoices = {
    [key: string]: NullablePropertyFkChoices;
};
export declare type ReadOnlyProperties = {
    [attribute: string]: boolean;
};
export interface FormProps {
    formik?: useFormikType;
    create?: boolean;
    edit?: boolean;
    entityService: EntityService;
    groups?: Array<FieldsetGroups | false>;
    fkChoices?: FkChoices;
    readOnlyProperties?: ReadOnlyProperties;
    row?: EntityValues;
    match: PathMatch;
    fixedValues?: Record<string, ScalarEntityValue>;
    filterValues?: FilterValuesType;
    filterBy?: string | undefined;
    initialValues: EntityValues;
    onSubmit: (values: EntityValues, imperativeMethods: FormikHelpers<EntityValues>) => Promise<void>;
}
export declare type EntityFormProps = FormProps & Pick<EntityInterface, 'validator' | 'foreignKeyGetter' | 'properties' | 'marshaller' | 'unmarshaller'>;
export declare type EntityFormType = (props: EntityFormProps) => JSX.Element | null;
declare const Form: EntityFormType;
export { Form };
