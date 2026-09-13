import { useStoreState } from '../../../../store';
import { useEffect, useState } from 'react';
import { getI18n } from 'react-i18next';
const useFirstColumnCriteria = (props) => {
    const { entityService, ignoreColumn, path } = props;
    const [firstColumnCriteria, setFirstColumnCriteria] = useState(undefined);
    const queryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    useEffect(() => {
        const columns = entityService.getCollectionColumns(storeState);
        const firstColumnKey = Object.keys(columns).find((columnKey) => columnKey !== ignoreColumn);
        const entity = entityService.getEntity();
        const firstColumnSpec = entity.properties[firstColumnKey];
        const isMultilang = (firstColumnSpec === null || firstColumnSpec === void 0 ? void 0 : firstColumnSpec.multilang) || false;
        const i18n = getI18n();
        const language = i18n.language.split('-').shift();
        const criteriaName = isMultilang
            ? `${firstColumnKey}.${language}`
            : firstColumnKey;
        const filters = entityService.getPropertyFilters(criteriaName, path);
        const filter = filters.includes('partial') ? 'partial' : filters[0];
        const firstCriteria = queryStringCriteria.find((criteria) => {
            return criteria.name === criteriaName && criteria.type === filter;
        });
        if (firstCriteria) {
            if (JSON.stringify(firstCriteria) === JSON.stringify(firstColumnCriteria)) {
                return;
            }
            setFirstColumnCriteria(firstCriteria);
        }
        else {
            const newCriteria = {
                name: criteriaName,
                type: filter,
                value: '',
            };
            if (JSON.stringify(newCriteria) === JSON.stringify(firstColumnCriteria)) {
                return;
            }
            setFirstColumnCriteria(newCriteria);
        }
    }, [queryStringCriteria]);
    return firstColumnCriteria;
};
export default useFirstColumnCriteria;
