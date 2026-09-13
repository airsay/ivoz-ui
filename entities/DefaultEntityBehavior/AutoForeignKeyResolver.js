import genericForeignKeyResolver from '../../services/api/genericForeigKeyResolver';
import { StoreContainer } from '../../store';
const autoForeignKeyResolver = (props) => {
    const { data, cancelToken, entityService, allowLinks, skip } = props;
    let { entities } = props;
    if (!entities) {
        entities = StoreContainer.store.getState().entities.entities;
    }
    if (!entities) {
        return [];
    }
    const promises = [];
    const fkProperties = entityService === null || entityService === void 0 ? void 0 : entityService.getFkProperties();
    for (const idx in fkProperties) {
        if (skip && skip.includes(idx)) {
            continue;
        }
        const ref = fkProperties[idx].$ref.replace('#/definitions/', '');
        const entity = entities[ref];
        if (!entity) {
            if (ref && ref.indexOf('_') < 0) {
                console.log('foreignKeyResolver', `${ref} not found`);
            }
            continue;
        }
        promises.push(genericForeignKeyResolver({
            data,
            fkFld: idx,
            entity: entity,
            addLink: allowLinks,
            cancelToken,
        }));
    }
    return promises;
};
export default autoForeignKeyResolver;
