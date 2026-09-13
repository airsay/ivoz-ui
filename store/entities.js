import { action } from 'easy-peasy';
const entities = {
    entities: {},
    setEntities: action((state, entities) => {
        state.entities = Object.assign({}, entities);
    }),
};
export default entities;
