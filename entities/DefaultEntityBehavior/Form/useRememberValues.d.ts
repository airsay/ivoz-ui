import { useFormikType } from '../../../services/form/types';
declare type Values = Record<string, string | number>;
declare const useStoredValues: () => Values;
declare const useRememberValues: (formik: useFormikType) => void;
export { useRememberValues, useStoredValues };
