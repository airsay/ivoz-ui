import { Action } from 'easy-peasy';
export declare type Language = {
    name: string;
    locale: string;
};
export interface LanguagesState {
    languages: Array<Language>;
}
interface LanguagesActions {
    setLanguages: Action<LanguagesState>;
}
export declare type LanguagesStore = LanguagesState & LanguagesActions;
declare const languages: LanguagesStore;
export default languages;
