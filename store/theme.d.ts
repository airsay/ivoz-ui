import { Action } from 'easy-peasy';
export declare type Language = {
    name: string;
    locale: string;
};
export interface ThemeState {
    name: string;
    theme: string;
    logo: string;
}
interface ThemeActions {
    setName: Action<ThemeState, string>;
    setTheme: Action<ThemeState, string>;
    setLogo: Action<ThemeState, string>;
}
export declare type ThemeStore = ThemeState & ThemeActions;
declare const theme: ThemeStore;
export default theme;
