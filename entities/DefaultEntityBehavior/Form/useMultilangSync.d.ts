import { Language } from 'store/i18n';
import { useFormikType } from 'services';
import { FormOnChangeEvent } from 'entities';
declare type Params = {
    formik?: useFormikType;
    languages: Array<Language>;
    changeHandler: (e: FormOnChangeEvent) => void;
};
export declare const useMultilangSync: ({ formik, languages, changeHandler, }: Params) => {
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};
export {};
