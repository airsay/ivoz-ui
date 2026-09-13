export const isPropertyEmbeddable = (property) => {
    var _a;
    return ((_a = property.$ref) === null || _a === void 0 ? void 0 : _a.indexOf('_')) > 0;
};
export const isPropertyFk = (property) => {
    var _a;
    return (property.$ref !== undefined &&
        ((_a = property.$ref) === null || _a === void 0 ? void 0 : _a.indexOf('_')) < 0);
};
export const isPropertyScalar = (property) => {
    var _a;
    return (property.$ref === undefined ||
        ((_a = property.$ref) === null || _a === void 0 ? void 0 : _a.indexOf('_')) > 0 ||
        property.multilang === true);
};
