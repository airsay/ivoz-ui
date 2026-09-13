import { action } from 'easy-peasy';
const theme = {
    name: '',
    theme: '',
    logo: '',
    // actions
    setName: action((state, name) => {
        state.name = name;
    }),
    setTheme: action((state, theme) => {
        state.theme = theme;
    }),
    setLogo: action((state, logo) => {
        state.logo = logo;
    }),
};
export default theme;
