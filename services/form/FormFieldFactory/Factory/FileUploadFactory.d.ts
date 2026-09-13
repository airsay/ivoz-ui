/// <reference types="react" />
import { FormOnChangeEvent } from '../../../../entities/DefaultEntityBehavior/Form/Form';
import { EmbeddableProperty } from '../../../api';
import EntityService from '../../../entity/EntityService';
import { useFormikType } from '../../../form/types';
declare type FileUploadFactoryPropsType = {
    fld: string;
    property: EmbeddableProperty;
    disabled: boolean;
    hasChanged: boolean;
    entityService: EntityService;
    formik: useFormikType;
    changeHandler: (event: FormOnChangeEvent) => void;
    handleBlur: (event: React.FocusEvent) => void;
};
export declare const FileUploadFactory: (props: FileUploadFactoryPropsType) => JSX.Element;
export {};
