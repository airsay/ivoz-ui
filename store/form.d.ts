import { Action, Thunk } from 'easy-peasy';
import { EntityValues } from '../services/entity/EntityService';
export interface FormState {
    row: EntityValues | undefined;
}
interface FormActions {
    setRow: Action<FormState, undefined | EntityValues>;
    reset: Thunk<FormState, undefined, unknown>;
}
export declare type FormStore = FormState & FormActions;
declare const list: FormStore;
export default list;
