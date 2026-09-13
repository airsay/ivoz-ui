export const isDetailedFormFieldSpec = (property) => {
    return typeof property !== 'string';
};
const filterFieldsetGroups = (groups) => {
    const resp = [];
    for (const idx in groups) {
        const group = groups[idx];
        if (!group) {
            continue;
        }
        const fields = group.fields.filter((item) => ['string', 'object'].includes(typeof item));
        if (!fields.length) {
            continue;
        }
        resp.push({
            legend: group.legend,
            fields,
        });
    }
    return resp;
};
export default filterFieldsetGroups;
