import { FormikHelpers, FormikState, FormikComputedProps, FormikHandlers } from 'formik';
export declare type useFormikType = FormikState<any> & FormikComputedProps<any> & FormikHelpers<any> & FormikHandlers & {
    visibleFields?: string[];
};
