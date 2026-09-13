import { action } from 'easy-peasy';
const menu = {
    hidden: true,
    variant: 'expanded',
    selected: undefined,
    // actions
    hide: action((state) => {
        state.hidden = true;
    }),
    toggleVisibility: action((state) => {
        state.hidden = !state.hidden;
    }),
    toggleVariant: action((state) => {
        if (state.variant === 'expanded') {
            state.variant = 'collapsed';
            return;
        }
        state.variant = 'expanded';
    }),
    collapse: action((state) => {
        state.selected = undefined;
    }),
    expand: action((state, menuKey) => {
        state.selected = menuKey;
    }),
};
export default menu;
