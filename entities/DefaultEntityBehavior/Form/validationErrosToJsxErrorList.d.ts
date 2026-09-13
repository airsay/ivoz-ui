/// <reference types="react" />
import { PropertyList, useFormikType } from '../../../services';
declare type ResponseType = Record<string, JSX.Element>;
declare const validationErrosToJsxErrorList: (formik: useFormikType, properties: PropertyList) => ResponseType;
export { validationErrosToJsxErrorList };
