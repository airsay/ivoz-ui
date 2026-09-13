import { action } from 'easy-peasy';
const languages = {
    languages: [],
    // actions
    setLanguages: action((state, languages) => {
        state.languages = [...languages];
    }),
};
export default languages;
