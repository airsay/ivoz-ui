import { CancelToken } from 'axios';
import React from 'react';
import { PathMatch } from 'react-router-dom';
import { DropdownChoices } from 'services';
import { EntityList } from '../router/parseRoutes';
import { ActionItem, RouteMapItem } from '../router/routeMapParser';
import { PartialPropertyList, PropertySpec } from '../services/api/ParsedApiSpecInterface';
import EntityService, { EntityValues, VisualToggleStates } from '../services/entity/EntityService';
import { EntityFormProps, FkChoices, fetchFksType } from './DefaultEntityBehavior';
import { IvozStoreState } from 'store';
import { ListContentProps } from '../components/List/Content/ListContent';
export declare type ListDecoratorPropsType = {
    field: string;
    row: any;
    property: PropertySpec;
    ignoreCustomComponent?: true;
    entityPath?: string;
};
export declare type ListDecoratorType = React.FunctionComponent<ListDecoratorPropsType>;
export interface ChildDecoratorProps {
    routeMapItem: RouteMapItem;
    row: Record<string, any>;
    entityService: EntityService;
    variant: 'icon' | 'text';
    disabled?: boolean | undefined;
}
export declare type ChildDecoratorType = React.FunctionComponent<React.PropsWithChildren<ChildDecoratorProps>>;
export interface foreignKeyResolverProps {
    data: any;
    allowLinks?: boolean;
    entityService?: EntityService;
    cancelToken?: CancelToken;
    entities?: EntityList;
    skip?: Array<string>;
}
export declare type foreignKeyResolverType = (props: foreignKeyResolverProps) => Promise<any>;
export declare type ForeignKeyGetterTypeArgs = {
    cancelToken?: CancelToken;
    entityService: EntityService;
    match: PathMatch;
    row?: EntityValues;
    filterContext?: boolean;
    skip?: Array<string>;
};
export declare type ForeignKeyGetterType = (props: ForeignKeyGetterTypeArgs) => Promise<any>;
export declare type FetchFksCallback = (choices: DropdownChoices, headers?: Record<string, string>) => void;
export declare type SelectOptionsArgs = {
    callback: FetchFksCallback;
    cancelToken?: CancelToken;
};
export declare type DynamicAutocompleteGetterTypeArgs = {
    entityService: EntityService;
    skip?: Array<string>;
};
export declare type DynamicSelectOptionsArgs = {
    searchTerm?: string;
    id?: string;
};
export declare type DynamicAutocompleteGetterType = (props: DynamicAutocompleteGetterTypeArgs) => Promise<Record<string, SelectOptionsType>>;
export declare type SelectOptionsType<T = any> = (props: SelectOptionsArgs, customProps?: T) => Promise<unknown>;
export declare type EntityAclType = {
    iden?: string;
    create: boolean;
    read: boolean;
    detail: boolean;
    update: boolean;
    delete: boolean;
};
export declare type calculateAclType = (acl: EntityAclType, parentRow: EntityValues) => EntityAclType;
export declare type ViewProps = {
    entityService: EntityService;
    row: EntityValues;
    groups?: any;
    create?: false;
    edit?: false;
    fkChoices?: FkChoices;
    match: PathMatch;
} & Pick<EntityInterface, 'foreignKeyResolver' | 'foreignKeyGetter' | 'unmarshaller' | 'properties'>;
export declare type ViewType = (props: ViewProps) => JSX.Element | null;
export declare type EntityValidatorResponse = Record<string, string | JSX.Element>;
export declare type EntityValidator = (values: EntityValues, properties: PartialPropertyList, visualToggles: VisualToggleStates, validateEmbeddables?: boolean) => EntityValidatorResponse;
export declare enum OrderDirection {
    asc = "asc",
    desc = "desc"
}
export declare type CustomActionsType = Record<string, ActionItem>;
export declare type DetailedColumnSpec = {
    name: string;
    size: number;
};
export declare type EntityColumnsArrayType = Array<string | DetailedColumnSpec>;
export declare type EntityColumnsFuncType<T extends IvozStoreState = IvozStoreState> = (store: T) => Array<string | DetailedColumnSpec>;
export declare type EntityColumnsType = EntityColumnsArrayType | EntityColumnsFuncType;
export default interface EntityInterface {
    initialValues: any;
    validator: EntityValidator;
    marshaller: (T: any, properties: PartialPropertyList, whitelist?: string[]) => any;
    unmarshaller: (T: any, properties: PartialPropertyList) => any;
    fetchFks: fetchFksType;
    foreignKeyResolver: () => Promise<foreignKeyResolverType>;
    foreignKeyGetter: () => Promise<ForeignKeyGetterType>;
    selectOptions?: () => Promise<SelectOptionsType>;
    dynamicAutocompleteGetters: DynamicAutocompleteGetterType;
    dynamicSelectOptions?: boolean;
    Form: () => Promise<React.FunctionComponent<EntityFormProps>>;
    View: () => Promise<ViewType>;
    List: React.FunctionComponent<ListContentProps>;
    ListDecorator: ListDecoratorType;
    ChildDecorator: ChildDecoratorType;
    customActions: CustomActionsType;
    acl: EntityAclType;
    calculateAclByParentRow: calculateAclType;
    iden: string;
    title: string | JSX.Element;
    path: string;
    localPath?: string;
    columns: EntityColumnsType;
    properties: PartialPropertyList;
    toStr: (row: EntityValues) => string;
    defaultOrderBy: string;
    defaultOrderDirection: OrderDirection;
    icon: React.FunctionComponent;
    link?: string;
    deleteDoubleCheck?: boolean;
    editDoubleCheck?: boolean;
    disableMultiDelete?: boolean;
}
