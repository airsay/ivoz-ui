import { Fragment as _Fragment, jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { isPropertyScalar, } from '../../../services';
const validationErrosToJsxErrorList = (formik, properties) => {
    var _a;
    const errorList = {};
    for (const idx in formik.errors) {
        const nameSegments = idx.split('.');
        const embeddable = nameSegments.length > 1;
        if (!embeddable && !formik.touched[idx]) {
            continue;
        }
        if (embeddable &&
            !((_a = formik.touched[nameSegments[0]]) === null || _a === void 0 ? void 0 : _a[nameSegments[1]])) {
            continue;
        }
        const multilang = embeddable &&
            properties[nameSegments[0]] &&
            isPropertyScalar(properties[nameSegments[0]]) &&
            properties[nameSegments[0]].multilang;
        const property = multilang ? properties[nameSegments[0]] : properties[idx];
        const label = multilang ? (_jsxs(_Fragment, { children: [property.label, " [", nameSegments[1], "]"] })) : (property.label);
        errorList[idx] = (_jsx("li", { children: _jsxs(_Fragment, { children: [label, ": ", formik.errors[idx]] }) }, idx));
    }
    return errorList;
};
export { validationErrosToJsxErrorList };
