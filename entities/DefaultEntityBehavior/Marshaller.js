import { isPropertyScalar, isPropertyFk, isPropertyEmbeddable, } from '../../services/api/ParsedApiSpecInterface';
const marshaller = (values, properties, whitelist = []) => {
    values = Object.assign({}, values);
    for (const idx in values) {
        const property = properties[idx];
        if (!property || property.readOnly) {
            if (!whitelist.includes(idx)) {
                delete values[idx];
            }
            continue;
        }
        if (isPropertyScalar(property) && property.format === 'password') {
            if (values[idx] === '*****') {
                delete values[idx];
            }
            continue;
        }
        if ((property === null || property === void 0 ? void 0 : property.type) === 'file') {
            if (values[idx].file) {
                values[idx] = values[idx].file;
            }
            else {
                for (const prop in values[idx]) {
                    //Empty string to null
                    if (values[idx][prop] === '') {
                        values[idx][prop] = null;
                    }
                }
            }
            continue;
        }
        if (property.type === 'boolean') {
            continue;
        }
        if (isPropertyEmbeddable(property) && property.multilang === true) {
            continue;
        }
        if (isPropertyFk(property) && property.$ref && values[idx] === '') {
            values[idx] = null;
            continue;
        }
        if (values[idx] === '__null__') {
            values[idx] = null;
        }
        if ((property === null || property === void 0 ? void 0 : property.type) === 'integer' && values[idx] === '') {
            values[idx] = null;
            continue;
        }
    }
    return values;
};
export default marshaller;
