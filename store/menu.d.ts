import { Action } from 'easy-peasy';
export interface MenuState {
    hidden: boolean;
    variant: 'collapsed' | 'expanded';
    selected: number | string | undefined;
}
interface MenuActions {
    hide: Action<MenuState>;
    toggleVisibility: Action<MenuState>;
    toggleVariant: Action<MenuState>;
    expand: Action<MenuState, number | string>;
    collapse: Action<MenuState>;
}
export declare type MenuStore = MenuState & MenuActions;
declare const menu: MenuStore;
export default menu;
