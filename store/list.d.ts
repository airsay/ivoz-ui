import { Action, Thunk } from 'easy-peasy';
import { EntityValues } from '../services/entity/EntityService';
import { NullablePropertyFkChoices } from '../entities';
declare type FkChoicesType = {
    [key: string]: NullablePropertyFkChoices;
};
export interface ListState {
    reloadTimestamp: number;
    parentRow: EntityValues | undefined;
    rows: Array<EntityValues>;
    customData: undefined | unknown;
    headers: Record<string, string>;
    fkChoices: FkChoicesType;
}
interface ListActions {
    reload: Action<ListState>;
    setParentRow: Action<ListState, undefined | EntityValues>;
    setRows: Action<ListState, Array<EntityValues>>;
    setCustomData: Action<ListState, unknown>;
    setHeaders: Action<ListState, Record<string, string>>;
    setFkChoices: Action<ListState, FkChoicesType>;
    reset: Thunk<ListState, undefined, unknown>;
}
export declare type ListStore = ListState & ListActions;
declare const list: ListStore;
export default list;
