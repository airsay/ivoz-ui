import { isPropertyEmbeddable, } from '../../services/api/ParsedApiSpecInterface';
import _ from '../../services/translations/translate';
const validator = (values, properties, visualToggle, validateEmbeddables = false) => {
    var _a, _b, _c, _d;
    let response = {};
    for (const idx in values) {
        if (!visualToggle[idx]) {
            continue;
        }
        if (!properties[idx]) {
            continue;
        }
        const isSubproperty = idx.indexOf('.') > 0;
        if (!validateEmbeddables && isSubproperty) {
            continue;
        }
        if (isPropertyEmbeddable(properties[idx])) {
            const value = values[idx];
            const embeddedValues = {};
            const embeddedVisualToggle = {};
            for (const subName in value) {
                embeddedValues[`${idx}.${subName}`] = value[subName];
                embeddedVisualToggle[`${idx}.${subName}`] = true;
            }
            const embeddedErrors = validator(embeddedValues, properties, embeddedVisualToggle, true);
            response = Object.assign(Object.assign({}, response), embeddedErrors);
            continue;
        }
        let isRootPropertyRequired;
        if (isSubproperty) {
            const parentIdx = idx.substring(0, idx.lastIndexOf('.'));
            const rootProperty = properties[parentIdx];
            isRootPropertyRequired = rootProperty === null || rootProperty === void 0 ? void 0 : rootProperty.required;
        }
        const required = isRootPropertyRequired !== null && isRootPropertyRequired !== void 0 ? isRootPropertyRequired : (_a = properties[idx]) === null || _a === void 0 ? void 0 : _a.required;
        const pattern = (_b = properties[idx]) === null || _b === void 0 ? void 0 : _b.pattern;
        if (pattern && !(values[idx] + '').match(pattern)) {
            if (!values[idx] && !required) {
                continue;
            }
            response[idx] = _('invalid pattern');
        }
        const isEmpty = ['', '__null__', null].includes(((_c = values === null || values === void 0 ? void 0 : values[idx]) === null || _c === void 0 ? void 0 : _c.toString()) || '');
        if (required && isEmpty) {
            response[idx] = _('required value');
        }
    }
    for (const fld in visualToggle) {
        if (!validateEmbeddables && fld.indexOf('.') > 0) {
            continue;
        }
        if (!visualToggle[fld]) {
            continue;
        }
        if (values[fld] !== undefined) {
            continue;
        }
        const required = (_d = properties[fld]) === null || _d === void 0 ? void 0 : _d.required;
        if (!required) {
            continue;
        }
        response[fld] = _('required value');
    }
    return response;
};
export default validator;
