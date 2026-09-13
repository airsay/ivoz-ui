import { Action } from 'easy-peasy';
import { EntityList } from '../router/parseRoutes';
interface EntitiesState {
    entities: EntityList;
}
interface EntitiesActions {
    setEntities: Action<EntitiesState, EntityList>;
}
export declare type EntitiesStore = EntitiesActions & EntitiesState;
declare const entities: EntitiesStore;
export default entities;
