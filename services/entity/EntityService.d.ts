/// <reference types="react" />
import { IvozStoreState } from 'store';
import { SearchFilterType } from '../../components/List/Filter/icons/FilterIconFactory';
import EntityInterface, { DynamicAutocompleteGetterTypeArgs, EntityAclType, ForeignKeyGetterType, OrderDirection, SelectOptionsType } from '../../entities/EntityInterface';
import { ActionModelSpec, ActionsSpec, PropertyList, fkPropertyList, visualToggleList } from '../../services/api/ParsedApiSpecInterface';
export declare type VisualToggleStates = {
    [key: string]: boolean;
};
export declare type ScalarEntityValue = string | number | boolean | null;
export declare type EntityValue = ScalarEntityValue | File | Array<string>;
export declare type EntityValues = {
    [key: string]: EntityValue | EntityValues;
};
export default class EntityService<T extends IvozStoreState = IvozStoreState> {
    private actions;
    private properties;
    private entityDefinition;
    constructor(actions: ActionsSpec, properties: PropertyList, entityDefinition: EntityInterface);
    getEntity(): EntityInterface;
    getProperties(): PropertyList;
    getAllProperties(): PropertyList;
    replaceProperties(properties: PropertyList): void;
    getFkProperties(): fkPropertyList;
    getColumns(store: T): PropertyList;
    getCollectionColumns(store: T): PropertyList;
    getColumnSize(columnName: string, store: T): number;
    getCollectionParamList(store: T): PropertyList;
    getVisualToggleRules(): visualToggleList;
    getVisualToggles(values: Record<string, any>): VisualToggleStates;
    private hideVisualToggle;
    private showVisualToggle;
    getDefultValues(): EntityValues;
    prepareFormData(payload: EntityValues): FormData | EntityValues;
    getCollectionPath(path?: string | null): string | null;
    getItemPath(path?: string | null): string | null;
    getItemByModel(model: string): ActionModelSpec | null;
    getPostPath(path?: string | null): string | null;
    getPutPath(path?: string | null): string | null;
    getDeletePath(path?: string | null): string | null;
    getTitle(): string | JSX.Element;
    getOrderBy(): string;
    getOrderDirection(): OrderDirection;
    getAcls(parentRow?: EntityValues): EntityAclType;
    getForeignKeyGetter(): ForeignKeyGetterType;
    getDynamicAutocompleteGetters(props: DynamicAutocompleteGetterTypeArgs): Promise<Record<string, SelectOptionsType>>;
    getListDecorator(): import("../../entities/EntityInterface").ListDecoratorType;
    getPropertyFilters(propertyName: string, path?: string): Array<SearchFilterType>;
    private getIden;
    private getFilters;
    private getFromModelList;
}
