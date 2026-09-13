const getMarshallerWhiteList = (props) => {
    const { filterBy, fixedValues, filterValues } = props;
    const whitelist = [];
    if (filterBy) {
        whitelist.push(filterBy);
    }
    if (fixedValues) {
        whitelist.push(...Object.keys(fixedValues));
    }
    if (filterValues) {
        // Sanitize values like type[exact]
        const sanitizedFilterValues = Object.keys(filterValues)
            .map((value) => { var _a; return ((_a = value.match(/^[^[]+/)) === null || _a === void 0 ? void 0 : _a[0]) || ''; })
            .filter((value) => value);
        whitelist.push(...sanitizedFilterValues);
    }
    return whitelist;
};
const collectReferences = (obj, references = []) => {
    if (isReferenceObject(obj)) {
        references.push(obj);
    }
    Object.keys(obj).forEach((key) => {
        const value = obj[key];
        if (isObject(value)) {
            collectReferences(value, references);
        }
    });
    return references;
};
const isObject = (value) => {
    return value && typeof value === 'object';
};
const isReferenceObject = (obj) => {
    return isObject(obj) && obj.hasOwnProperty('$ref');
};
const findMatchingColumns = (columnNames, inverseRelations) => {
    return columnNames.filter((column) => {
        const singularColumn = getSingularForm(column);
        return inverseRelations.some((relation) => {
            return objectHasMatchingValue(relation, singularColumn);
        });
    });
};
const getSingularForm = (word) => {
    return word.endsWith('s')
        ? word.slice(0, -1).toLowerCase()
        : word.toLowerCase();
};
const objectHasMatchingValue = (obj, target) => {
    return Object.values(obj).some((value) => {
        return typeof value === 'string' && value.toLowerCase().includes(target);
    });
};
export { getMarshallerWhiteList, collectReferences, findMatchingColumns };
