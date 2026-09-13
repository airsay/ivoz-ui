var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as React from 'react';
import { OrderDirection, } from './EntityInterface';
import { fetchAllPages } from '../helpers/fetchAllPages';
import { isEntityItem } from '../router';
import autoForeignKeyResolver from './DefaultEntityBehavior/AutoForeignKeyResolver';
import autoSelectOptions, { autoSelectOptionHandlers, } from './DefaultEntityBehavior/AutoSelectOptions';
import filterFieldsetGroups from './DefaultEntityBehavior/FilterFieldsetGroups';
import foreignKeyGetter from './DefaultEntityBehavior/ForeignKeyGetter';
import foreignKeyResolver from './DefaultEntityBehavior/ForeignKeyResolver';
import { Form, } from './DefaultEntityBehavior/Form/index';
import ListDecorator from './DefaultEntityBehavior/ListDecorator';
import marshaller from './DefaultEntityBehavior/Marshaller';
import unmarshaller from './DefaultEntityBehavior/Unmarshaller';
import validator from './DefaultEntityBehavior/Validator';
import View from './DefaultEntityBehavior/View';
import List from './DefaultEntityBehavior/List';
export const initialValues = {};
export const columns = [];
export const properties = {};
export const acl = {
    create: true,
    read: true,
    detail: true,
    update: true,
    delete: true,
};
export const calculateAclByParentRow = (acl) => acl;
export const ChildDecorator = (props) => {
    const Children = props.children;
    if (!Children) {
        return null;
    }
    return Children;
};
export const ChildDecoratorMemo = React.memo(ChildDecorator, (prev, next) => {
    const areEntityItems = isEntityItem(prev.routeMapItem) && isEntityItem(next.routeMapItem);
    const sameRoute = areEntityItems &&
        prev.routeMapItem.route ===
            next.routeMapItem.route;
    const sameId = prev.row.id === next.row.id;
    const sameState = prev.disabled === next.disabled;
    return sameRoute && sameId && sameState;
});
/** deprecated, use fetchAllPages instead */
const fetchFks = (endpoint, properties /* Array<string> is deprecated */, setter, cancelToken) => __awaiter(void 0, void 0, void 0, function* () {
    return fetchAllPages({
        endpoint,
        params: {
            _properties: properties,
        },
        setter,
        cancelToken,
    });
});
const DefaultEntityBehavior = {
    initialValues,
    validator,
    marshaller,
    unmarshaller,
    foreignKeyResolver: () => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield import('./DefaultEntityBehavior/ForeignKeyResolver');
        return module.default;
    }),
    foreignKeyGetter: () => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield import('./DefaultEntityBehavior/ForeignKeyGetter');
        return module.default;
    }),
    dynamicAutocompleteGetters: (props) => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield import('./DefaultEntityBehavior/DynamicAutocompleteGetter');
        return module.default(props);
    }),
    columns,
    properties,
    acl,
    calculateAclByParentRow,
    List,
    ListDecorator,
    ChildDecorator: ChildDecoratorMemo,
    customActions: {},
    toStr: (row) => {
        return row.id || '[*]';
    },
    Form: () => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield import('./DefaultEntityBehavior/Form/Form');
        return module.Form;
    }),
    View: () => __awaiter(void 0, void 0, void 0, function* () {
        const module = yield import('./DefaultEntityBehavior/View');
        return module.default;
    }),
    fetchFks,
    fetchAllFks: fetchAllPages,
    defaultOrderBy: 'id',
    defaultOrderDirection: OrderDirection.asc,
};
export default DefaultEntityBehavior;
export { Form, ListDecorator, View, autoForeignKeyResolver, autoSelectOptions, autoSelectOptionHandlers, filterFieldsetGroups, foreignKeyGetter, foreignKeyResolver, marshaller, unmarshaller, validator, };
