import { isPropertyEmbeddable, } from '../../services/api/ParsedApiSpecInterface';
// API Response format => formik compatible format
const unmarshaller = (row, properties) => {
    var _a;
    const normalizedData = {};
    // eslint-disable-next-line
    const dateTimePattern = `^[0-9]{4}\-[0-9]{2}\-[0-9]{2} [0-9]{2}:[0-9]{2}:[0-9]{2}$`;
    const dateTimeRegExp = new RegExp(dateTimePattern);
    for (const idx in row) {
        if (row[idx] == null) {
            // formik doesn't like null values
            const property = properties[idx];
            normalizedData[idx] = (property === null || property === void 0 ? void 0 : property.null) ? '__null__' : '';
        }
        else if (typeof row[idx] === 'object' &&
            (row[idx].id || row[idx].id === 0)) {
            // flatten foreign keys
            const hasCustomComponent = ((_a = properties[idx]) === null || _a === void 0 ? void 0 : _a.component) !== undefined;
            normalizedData[idx] = hasCustomComponent ? row[idx] : row[idx].id;
        }
        else if (typeof row[idx] === 'string' && row[idx].match(dateTimeRegExp)) {
            // formik datetime format: "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS"
            normalizedData[idx] = row[idx].replace(' ', 'T');
        }
        else if (properties[idx] &&
            properties[idx].type === 'boolean') {
            normalizedData[idx] = row[idx] === true || row[idx] === 1 ? true : false;
        }
        else if (typeof row[idx] === 'object' &&
            properties[idx] &&
            isPropertyEmbeddable(properties[idx])) {
            //embeddables
            const subset = {};
            for (const subkey in row[idx]) {
                subset[`${idx}.${subkey}`] = row[idx][subkey];
            }
            const unmarshalledEmbeddable = unmarshaller(subset, properties);
            const unmarshalledSubset = {};
            for (const subkey in unmarshalledEmbeddable) {
                const propertyName = subkey.split('.').pop();
                unmarshalledSubset[propertyName] = unmarshalledEmbeddable[subkey];
            }
            normalizedData[idx] = unmarshalledSubset;
        }
        else {
            normalizedData[idx] = row[idx];
        }
    }
    return normalizedData;
};
export default unmarshaller;
