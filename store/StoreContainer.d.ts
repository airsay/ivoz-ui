import { Store } from 'easy-peasy';
import { IvozStore } from './index';
declare class StoreContainer {
    static store: Store<IvozStore>;
}
export default StoreContainer;
