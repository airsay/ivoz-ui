export default class ApiSpecParser {
    parse(spec) {
        return this.parseSpec(spec);
    }
    parseSpec(apiSpec) {
        var _a;
        var _b;
        const responseData = {};
        for (const modelName in apiSpec.definitions) {
            const entityNameRoot = modelName.split('-').shift();
            if (!responseData[entityNameRoot]) {
                responseData[entityNameRoot] = {};
            }
            const paths = this.getEntityPaths(modelName, apiSpec);
            if (modelName.indexOf('_') > 0 && Object.keys(paths).length) {
                const parentModelName = modelName.split('_').shift();
                responseData[parentModelName][modelName] = Object.assign(Object.assign({}, apiSpec.definitions[parentModelName]), { paths });
            }
            else if (modelName.indexOf('_') > 0) {
                //embed properties in parent model
                const parentModelName = modelName.split('_').shift();
                for (const idx in responseData[parentModelName]) {
                    const model = responseData[parentModelName][idx];
                    for (const propertyIdx in model === null || model === void 0 ? void 0 : model.properties) {
                        const property = model.properties[propertyIdx];
                        if (!property.$ref) {
                            continue;
                        }
                        if (property.$ref !== `#/definitions/${modelName}`) {
                            continue;
                        }
                        const embeddedModel = apiSpec.definitions[modelName];
                        for (const embeddedIdx in embeddedModel.properties) {
                            const embeddedProperty = embeddedModel.properties[embeddedIdx];
                            responseData[parentModelName][idx].properties[`${propertyIdx}.${embeddedIdx}`] = embeddedProperty;
                        }
                        if (embeddedModel.required) {
                            (_a = (_b = responseData[parentModelName][idx]).required) !== null && _a !== void 0 ? _a : (_b.required = []);
                            responseData[parentModelName][idx].required = [
                                ...responseData[parentModelName][idx].required,
                                ...embeddedModel.required.map((fld) => `${propertyIdx}.${fld}`),
                            ];
                        }
                    }
                }
            }
            responseData[entityNameRoot][modelName] = Object.assign(Object.assign({}, apiSpec.definitions[modelName]), { paths });
        }
        const response = {};
        for (const modelName in responseData) {
            response[modelName] = {
                properties: {},
            };
            const properties = [];
            for (const modelVariant in responseData[modelName]) {
                const paths = responseData[modelName][modelVariant].paths;
                const isEmpty = Object.keys(paths).length === 0;
                if (isEmpty) {
                    response[modelName].properties = Object.assign(Object.assign({}, response[modelName].properties), responseData[modelName][modelVariant].properties);
                    continue;
                }
                for (const method in paths) {
                    if (!response[modelName].actions) {
                        response[modelName].actions = {};
                    }
                    if (!response[modelName].actions[method]) {
                        response[modelName].actions[method] = {};
                    }
                    const variantData = responseData[modelName][modelVariant];
                    const modelVariantPaths = paths[method];
                    if (method !== 'get') {
                        response[modelName].actions[method][modelVariant] = {
                            paths: Object.keys(paths[method]),
                            parameters: modelVariantPaths[Object.keys(modelVariantPaths)[0]].parameters,
                            properties: variantData.properties,
                            required: variantData.required,
                            type: variantData.type,
                        };
                    }
                    else if (this.isCollection(paths.get)) {
                        if (!response[modelName].actions[method]['collection']) {
                            response[modelName].actions[method]['collection'] = {};
                        }
                        response[modelName].actions[method]['collection'][modelVariant] = {
                            paths: this.getCollectionPaths(paths.get),
                            parameters: modelVariantPaths[Object.keys(modelVariantPaths)[0]].parameters,
                            properties: variantData.properties,
                            required: variantData.required,
                            type: variantData.type,
                        };
                    }
                    else if (this.isItem(paths.get)) {
                        if (!response[modelName].actions[method]['item']) {
                            response[modelName].actions[method]['item'] = {};
                        }
                        response[modelName].actions[method]['item'][modelVariant] = {
                            paths: this.getItemPaths(paths.get),
                            parameters: modelVariantPaths[Object.keys(modelVariantPaths)[0]].parameters,
                            properties: variantData.properties,
                            required: variantData.required,
                            type: variantData.type,
                        };
                    }
                    for (const propertyName in variantData.properties) {
                        if (!properties[propertyName]) {
                            properties[propertyName] = {};
                        }
                        const isRequired = variantData.required &&
                            variantData.required.includes(propertyName);
                        properties[propertyName] = Object.assign(Object.assign(Object.assign({}, properties[propertyName]), variantData.properties[propertyName]), { required: isRequired || false });
                    }
                    response[modelName].properties = properties;
                }
            }
        }
        return response;
    }
    isCollection(paths) {
        const collectionPaths = this.getCollectionPaths(paths);
        return collectionPaths.length > 0;
    }
    getCollectionPaths(paths) {
        return Object.keys(paths).filter((key) => {
            var _a, _b, _c;
            return (_c = (_b = (_a = paths[key]) === null || _a === void 0 ? void 0 : _a.responses['200']) === null || _b === void 0 ? void 0 : _b.schema) === null || _c === void 0 ? void 0 : _c.items;
        });
    }
    isItem(paths) {
        const itemPaths = this.getItemPaths(paths);
        return itemPaths.length > 0;
    }
    getItemPaths(paths) {
        return Object.keys(paths).filter((key) => {
            var _a, _b, _c, _d;
            return (((_c = (_b = (_a = paths[key]) === null || _a === void 0 ? void 0 : _a.responses['200']) === null || _b === void 0 ? void 0 : _b.schema) === null || _c === void 0 ? void 0 : _c.$ref) ||
                ((_d = paths[key]) === null || _d === void 0 ? void 0 : _d.produces.includes('application/octet-stream')));
        });
    }
    getEntityBasePath(entityNameRoot) {
        const underScored = entityNameRoot.replace(/([A-Z])/g, (upperString) => {
            return '_' + upperString.toLowerCase();
        });
        return '/' + underScored.slice(1);
    }
    getEntityPaths(entityNameRoot, apiSpec) {
        entityNameRoot = entityNameRoot.replace('-', '-');
        const endpoints = {};
        for (const endpoint in apiSpec.paths) {
            for (const method in apiSpec.paths[endpoint]) {
                const action = apiSpec.paths[endpoint][method];
                const isGetRequest = ['get'].includes(method.toLowerCase())
                    ? true
                    : false;
                const matches = isGetRequest
                    ? this.filterByResponseSchema(action, entityNameRoot)
                    : this.filterByRequestSchema(action, entityNameRoot);
                const uploadActionMatch = !isGetRequest &&
                    this.filterByResponseSchema(action, entityNameRoot).length > 0 &&
                    this.isUploadAction(action);
                if (!matches.length && !uploadActionMatch) {
                    continue;
                }
                if (!endpoints[method]) {
                    endpoints[method] = {};
                }
                endpoints[method][endpoint] = action;
                const deleteAction = apiSpec.paths[endpoint]['delete'];
                if (isGetRequest && deleteAction) {
                    if (!endpoints['delete']) {
                        endpoints['delete'] = {};
                    }
                    endpoints['delete'][endpoint] = deleteAction;
                }
            }
        }
        return endpoints;
    }
    filterByRequestSchema(action, entityNameRoot) {
        const pattern = `^\#\/definitions\/${entityNameRoot}$`;
        const regExp = new RegExp(pattern);
        return Object.values(action.parameters)
            .map((parameter) => {
            var _a;
            if ((parameter === null || parameter === void 0 ? void 0 : parameter.in) === 'formData') {
                if (entityNameRoot.toLowerCase() === (parameter === null || parameter === void 0 ? void 0 : parameter.name.toLowerCase())) {
                    return `#/definitions/${entityNameRoot}`;
                }
            }
            return (_a = parameter === null || parameter === void 0 ? void 0 : parameter.schema) === null || _a === void 0 ? void 0 : _a.$ref;
        })
            .filter((ref) => {
            return ref && ref.search(regExp) === 0;
        });
    }
    filterByResponseSchema(action, entityNameRoot) {
        const isFileDownload = action.produces && action.produces.includes('application/octet-stream');
        if (isFileDownload) {
            return Object.values(action.responses)
                .filter((response) => (response === null || response === void 0 ? void 0 : response.description) &&
                response.description.indexOf('#/definitions/') >= 0)
                .map((response) => { var _a; return (_a = response.description.replace('#/definitions/', '')) !== null && _a !== void 0 ? _a : ''; })
                .map((description) => {
                const modelMatch = description.toLowerCase() === entityNameRoot.toLowerCase();
                return modelMatch ? entityNameRoot : '';
            })
                .filter((description) => {
                return description !== '';
            });
        }
        const pattern = `^\#\/definitions\/${entityNameRoot}$`;
        const regExp = new RegExp(pattern);
        return Object.values(action.responses)
            .map((response) => response.schema)
            .map((schema) => {
            var _a, _b;
            return (_b = (_a = schema === null || schema === void 0 ? void 0 : schema.items) === null || _a === void 0 ? void 0 : _a.$ref) !== null && _b !== void 0 ? _b : schema === null || schema === void 0 ? void 0 : schema.$ref;
        })
            .filter((ref) => {
            return ref && ref.search(regExp) === 0;
        });
    }
    isUploadAction(action) {
        const fileParams = action.parameters.filter((param) => {
            return param.type === 'file';
        });
        return fileParams.length > 0;
    }
}
