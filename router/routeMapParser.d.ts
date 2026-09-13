import React from 'react';
import EntityService, { ScalarEntityValue } from '../services/entity/EntityService';
import EntityInterface from '../entities/EntityInterface';
import { PathMatch } from 'react-router-dom';
export declare type FilterValuesType = Record<string, ScalarEntityValue | ScalarEntityValue[]>;
export interface EntityItem {
    entity: EntityInterface;
    route?: string;
    filterBy?: string;
    filterValues?: FilterValuesType;
    fixedValues?: Record<string, ScalarEntityValue>;
    children?: Array<RouteMapItem>;
    divider?: boolean;
    disabled?: boolean;
}
export interface ActionItemProps {
    row: Record<string, any>;
    entityService: EntityService;
    match: PathMatch;
    variant?: 'icon' | 'text';
}
export interface MultiSelectActionItemProps {
    rows: Array<Record<string, any>>;
    selectedValues: Array<string>;
    entityService: EntityService;
    variant?: 'icon' | 'text';
}
export interface GlobalActionItemProps {
    rows: Array<Record<string, any>>;
    entityService: EntityService;
    variant?: 'icon' | 'text';
}
export declare type CustomActionProps = ActionItemProps | MultiSelectActionItemProps | GlobalActionItemProps;
export declare const isSingleRowAction: (props: CustomActionProps) => props is ActionItemProps;
export declare const isMultiSelectAction: (props: CustomActionProps) => props is MultiSelectActionItemProps;
export declare const isGlobalAction: (props: CustomActionProps) => props is GlobalActionItemProps;
export declare type SingleRowFunctionComponent = React.FunctionComponent<ActionItemProps>;
export declare type MultiSelectFunctionComponent = React.FunctionComponent<MultiSelectActionItemProps>;
export declare type GlobalFunctionComponent = React.FunctionComponent<GlobalActionItemProps>;
export declare type ActionFunctionComponent = SingleRowFunctionComponent | MultiSelectFunctionComponent | GlobalFunctionComponent;
export interface ActionItem {
    action: ActionFunctionComponent;
    rowAction?: boolean;
    multiselect?: boolean;
    global?: true;
    disabled?: boolean;
}
export declare type RouteMapItem = EntityItem | ActionItem;
export declare type RouteMapBlock<T extends RouteMapItem = RouteMapItem> = {
    label: string | JSX.Element | null;
    icon?: React.FunctionComponent;
    children: Array<T>;
};
export declare const isRouteMapBlock: (property: RouteMapBlock | RouteMapItem) => property is RouteMapBlock<RouteMapItem>;
export declare const isRouteMapItem: (property: RouteMapBlock | RouteMapItem) => property is RouteMapBlock<RouteMapItem>;
export declare const isEntityItem: (property: RouteMapItem) => property is EntityItem;
export declare const isActionItem: (property: RouteMapItem) => property is ActionItem;
export declare const isSingleRowActionItem: (property: RouteMapItem, action: ActionFunctionComponent) => action is SingleRowFunctionComponent;
export declare type RouteMap<T extends RouteMapItem = RouteMapItem> = Array<T | RouteMapBlock<T>>;
declare const routeMapParser: <T extends RouteMapItem = RouteMapItem>(map: RouteMap<T>) => RouteMap<T>;
export default routeMapParser;
