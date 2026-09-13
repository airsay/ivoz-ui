import { OrderDirection, } from '../../entities/EntityInterface';
import { isPropertyFk, } from '../../services/api/ParsedApiSpecInterface';
import { getI18n } from 'react-i18next';
export default class EntityService {
    constructor(
    // API spec
    actions, properties, 
    // App spec
    entityDefinition) {
        this.actions = actions;
        this.properties = properties;
        this.entityDefinition = entityDefinition;
    }
    getEntity() {
        return this.entityDefinition;
    }
    // Properties declared explicitly in the entity
    getProperties() {
        const response = {};
        const properties = this.entityDefinition.properties;
        for (const idx in properties) {
            const propertyOverwrite = properties[idx] || {};
            const label = properties[idx].label || '';
            response[idx] = Object.assign(Object.assign(Object.assign({}, this.properties[idx]), propertyOverwrite), { label });
        }
        return response;
    }
    // All API spec properties + properties declared in entity
    getAllProperties() {
        const response = Object.assign({}, this.properties);
        const entityProperties = this.entityDefinition.properties;
        for (const idx in entityProperties) {
            const propertyOverwrite = entityProperties[idx] || {};
            const label = entityProperties[idx].label || '';
            response[idx] = Object.assign(Object.assign(Object.assign({}, this.properties[idx]), propertyOverwrite), { label });
        }
        return response;
    }
    replaceProperties(properties) {
        this.entityDefinition.properties = properties;
    }
    getFkProperties() {
        const response = {};
        const properties = this.getProperties();
        for (const idx in properties) {
            if (!isPropertyFk(properties[idx])) {
                continue;
            }
            response[idx] = properties[idx];
        }
        return response;
    }
    getColumns(store) {
        const response = {};
        const properties = this.entityDefinition.properties;
        const columns = Array.isArray(this.entityDefinition.columns)
            ? this.entityDefinition.columns
            : this.entityDefinition.columns(store);
        let columnNames = columns.map((column) => {
            return typeof column === 'string' ? column : column.name;
        });
        columnNames = columnNames.length ? columnNames : Object.keys(properties);
        for (const idx of columnNames) {
            if (!this.properties[idx] && !properties[idx]) {
                continue;
            }
            const propertyOverwrite = properties[idx] || {};
            const label = properties[idx].label || '';
            response[idx] = Object.assign(Object.assign(Object.assign({}, this.properties[idx]), propertyOverwrite), { label });
        }
        return response;
    }
    getCollectionColumns(store) {
        var _a, _b;
        const allColumns = this.getColumns(store);
        const collectionAction = this.getFromModelList(((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.collection) || {}, this.entityDefinition.path);
        const collectionActionFields = Object.keys((collectionAction === null || collectionAction === void 0 ? void 0 : collectionAction.properties) || {});
        const response = {};
        const columns = Array.isArray(this.entityDefinition.columns)
            ? this.entityDefinition.columns
            : this.entityDefinition.columns(store);
        const columnNames = columns.map((column) => {
            return typeof column === 'string' ? column : column.name;
        });
        const restrictedColumns = columnNames.length
            ? columnNames
            : collectionActionFields;
        for (const colName in allColumns) {
            if (!restrictedColumns.includes(colName)) {
                continue;
            }
            response[colName] = allColumns[colName];
        }
        return response;
    }
    getColumnSize(columnName, store) {
        const columns = Array.isArray(this.entityDefinition.columns)
            ? this.entityDefinition.columns
            : this.entityDefinition.columns(store);
        let customSizeColumns = 0;
        let sizeSum = 0;
        for (const column of columns) {
            if (typeof column === 'string') {
                continue;
            }
            customSizeColumns++;
            if (column.name === columnName) {
                return column.size;
            }
            sizeSum += column.size;
        }
        return Math.floor((100 - sizeSum) / (columns.length - customSizeColumns));
    }
    getCollectionParamList(store) {
        var _a, _b;
        const collectionAction = this.getFromModelList(((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.collection) || {}, this.entityDefinition.path);
        const collectionActionParameters = (collectionAction === null || collectionAction === void 0 ? void 0 : collectionAction.parameters) || {};
        const paramNames = Object.keys(collectionActionParameters).map((key) => {
            return collectionActionParameters[key].name;
        });
        const columns = this.getColumns(store);
        const filteredColumns = {};
        for (const columnName in columns) {
            if (!paramNames.includes(columnName)) {
                if (columns[columnName].multilang) {
                    const locale = getI18n().language.substring(0, 2);
                    filteredColumns[`${columnName}.${locale}`] = columns[columnName];
                }
                continue;
            }
            filteredColumns[columnName] = columns[columnName];
        }
        return filteredColumns;
    }
    getVisualToggleRules() {
        const rules = {};
        const properties = this.entityDefinition.properties;
        for (const idx in properties) {
            const visualToggle = properties[idx].visualToggle;
            if (!visualToggle) {
                continue;
            }
            rules[idx] = visualToggle;
        }
        return rules;
    }
    getVisualToggles(values) {
        const properties = this.entityDefinition.properties;
        const visualToggles = Object.keys(properties).reduce((accumulator, fldName) => {
            accumulator[fldName] = true;
            return accumulator;
        }, {});
        for (const idx in values) {
            this.hideVisualToggle(idx, values[idx], visualToggles);
        }
        for (const idx in values) {
            this.showVisualToggle(idx, values[idx], visualToggles);
        }
        return visualToggles;
    }
    hideVisualToggle(fld, value, visualToggles) {
        const rules = this.getVisualToggleRules();
        if (!rules[fld]) {
            return visualToggles;
        }
        if (value === '__null__' || value === null) {
            if (!rules[fld]['__null__']) {
                return visualToggles;
            }
            for (const hideFld of rules[fld]['__null__']['hide']) {
                visualToggles[hideFld] = false;
            }
            return visualToggles;
        }
        const normalizedValue = typeof value === 'boolean' ? value + 0 : value;
        if (!rules[fld][normalizedValue]) {
            if (rules[fld]['__default__']) {
                for (const hideFld of rules[fld]['__default__']['hide']) {
                    visualToggles[hideFld] = false;
                }
            }
            return visualToggles;
        }
        for (const hideFld of rules[fld][normalizedValue]['hide']) {
            visualToggles[hideFld] = false;
        }
        return visualToggles;
    }
    showVisualToggle(fld, value, visualToggles) {
        const rules = this.getVisualToggleRules();
        if (!visualToggles[fld]) {
            return visualToggles;
        }
        if (!rules[fld]) {
            return visualToggles;
        }
        if (value === '__null__' || value === null) {
            if (!rules[fld]['__null__']) {
                return visualToggles;
            }
            for (const hideFld of rules[fld]['__null__']['show']) {
                visualToggles[hideFld] = true;
            }
            return visualToggles;
        }
        const normalizedValue = typeof value === 'boolean' ? value + 0 : value;
        if (!rules[fld][normalizedValue]) {
            if (rules[fld]['__default__']) {
                for (const showFld of rules[fld]['__default__']['show']) {
                    visualToggles[showFld] = true;
                }
            }
            return visualToggles;
        }
        for (const showFld of rules[fld][normalizedValue]['show']) {
            visualToggles[showFld] = true;
        }
        return visualToggles;
    }
    getDefultValues() {
        const response = {};
        const properties = this.getAllProperties();
        for (const idx in properties) {
            const property = properties[idx];
            if (property.default === undefined && !property.enum) {
                if (property.type === 'array') {
                    response[idx] = [];
                }
                else if (idx.indexOf('.') > 0) {
                    response[idx] = '';
                }
                continue;
            }
            if (property.default === undefined) {
                response[idx] = Object.keys(property.enum)[0];
            }
            else if (property.type === 'boolean') {
                response[idx] = parseInt(property.default, 10);
            }
            else {
                response[idx] = property.default;
            }
        }
        const embeddables = {};
        for (const idx in response) {
            if (idx.indexOf('.') < 0) {
                continue;
            }
            const nameSegments = idx.split('.');
            const parent = nameSegments[0];
            const property = nameSegments[1];
            if (!embeddables[parent]) {
                embeddables[parent] = {};
            }
            embeddables[parent][property] = response[idx];
            delete response[idx];
        }
        return Object.assign(Object.assign({}, response), embeddables);
    }
    prepareFormData(payload) {
        const files = {};
        for (const idx in payload) {
            if (payload[idx] instanceof File) {
                files[idx] = payload[idx];
                delete payload[idx];
            }
        }
        const isMultiPart = Object.keys(files).length > 0;
        if (!isMultiPart) {
            return payload;
        }
        const formData = new FormData();
        formData.append(this.getIden(true), JSON.stringify(payload));
        for (const idx in files) {
            formData.append(idx, files[idx]);
        }
        return formData;
    }
    getCollectionPath(path = null) {
        var _a, _b;
        const collectionAction = ((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.collection) || {};
        const action = this.getFromModelList(collectionAction, path);
        return action === null || action === void 0 ? void 0 : action.paths[0];
    }
    getItemPath(path = null) {
        var _a, _b;
        const itemActions = ((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.item) || {};
        const action = this.getFromModelList(itemActions, path);
        return action === null || action === void 0 ? void 0 : action.paths[0];
    }
    getItemByModel(model) {
        var _a, _b;
        const itemActions = ((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.item) || {};
        if (!itemActions[model]) {
            return null;
        }
        return JSON.parse(JSON.stringify(itemActions[model]));
    }
    getPostPath(path = null) {
        var _a;
        const itemActions = ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.post) || {};
        const action = this.getFromModelList(itemActions, path);
        return action === null || action === void 0 ? void 0 : action.paths[0];
    }
    getPutPath(path = null) {
        var _a;
        const itemActions = ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.put) || {};
        const action = this.getFromModelList(itemActions, path);
        return action === null || action === void 0 ? void 0 : action.paths[0];
    }
    getDeletePath(path = null) {
        var _a;
        const itemActions = ((_a = this.actions) === null || _a === void 0 ? void 0 : _a.delete) || {};
        const action = this.getFromModelList(itemActions, path);
        return action === null || action === void 0 ? void 0 : action.paths[0];
    }
    getTitle() {
        return this.entityDefinition.title;
    }
    getOrderBy() {
        var _a;
        return ((_a = this.entityDefinition) === null || _a === void 0 ? void 0 : _a.defaultOrderBy) || '';
    }
    getOrderDirection() {
        var _a;
        return ((_a = this.entityDefinition) === null || _a === void 0 ? void 0 : _a.defaultOrderDirection) || OrderDirection.asc;
    }
    getAcls(parentRow) {
        var _a;
        const create = this.entityDefinition.acl.create && this.actions.post ? true : false;
        const read = this.entityDefinition.acl.read && this.actions.get ? true : false;
        const detail = this.entityDefinition.acl.detail && ((_a = this.actions.get) === null || _a === void 0 ? void 0 : _a.item) ? true : false;
        const update = this.entityDefinition.acl.update && this.actions.put ? true : false;
        const remove = this.entityDefinition.acl.delete && this.actions.delete ? true : false;
        const acl = {
            create,
            read,
            detail,
            update,
            delete: remove,
        };
        if (parentRow) {
            return this.entityDefinition.calculateAclByParentRow(acl, parentRow);
        }
        return acl;
    }
    getForeignKeyGetter() {
        return this.entityDefinition.foreignKeyGetter;
    }
    getDynamicAutocompleteGetters(props) {
        return this.entityDefinition.dynamicAutocompleteGetters(props);
    }
    getListDecorator() {
        return this.entityDefinition.ListDecorator;
    }
    getPropertyFilters(propertyName, path) {
        const filters = this.getFilters(path);
        return filters[propertyName] || [];
    }
    getIden(lcFirst = false) {
        const response = this.entityDefinition.iden;
        if (lcFirst) {
            return response.charAt(0).toLowerCase() + response.slice(1);
        }
        return response;
    }
    getFilters(path) {
        var _a, _b;
        const collectionAction = ((_b = (_a = this.actions) === null || _a === void 0 ? void 0 : _a.get) === null || _b === void 0 ? void 0 : _b.collection) || {};
        const action = this.getFromModelList(collectionAction, path);
        if (!action) {
            return {};
        }
        const filters = {};
        // eslint-disable-next-line
        const filterRegExp = new RegExp(/^([^\[]+)\[?([^\]]*)\]?/);
        const parameters = action.parameters || {};
        for (const idx in parameters) {
            const name = parameters[idx].name;
            const match = name.match(filterRegExp);
            const fieldName = match[1];
            let modifier = match[2] || null;
            if (!modifier) {
                if (name.indexOf('[]') >= 0) {
                    modifier = 'in';
                }
                else if (parameters[idx].type === 'boolean') {
                    modifier = '';
                }
                else {
                    modifier = parameters[idx].type === 'string' ? 'exact' : 'eq';
                }
            }
            if (!filters[fieldName]) {
                filters[fieldName] = [];
            }
            if (filters[fieldName].includes(modifier)) {
                continue;
            }
            if (modifier === 'in' && filters[fieldName].includes('exact')) {
                const index = filters[fieldName].indexOf('exact');
                if (index > -1) {
                    filters[fieldName].splice(index, 1);
                }
            }
            filters[fieldName].push(modifier);
        }
        return filters;
    }
    getFromModelList(modelList, path = null) {
        if (path) {
            const filteresModelList = {};
            for (const idx in modelList) {
                if (!modelList[idx].paths.includes(path)) {
                    continue;
                }
                filteresModelList[idx] = modelList[idx];
            }
            return this.getFromModelList(filteresModelList, null);
        }
        const collectionModels = Object.keys(modelList);
        if (collectionModels.length) {
            return modelList[collectionModels[0]];
        }
        return null;
    }
}
