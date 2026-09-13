/// <reference types="react" />
import { Action } from 'easy-peasy';
interface FlashMsgState {
    msg: undefined | string | React.ReactNode;
    type: undefined | 'success' | 'warning' | 'error' | 'info';
}
interface FlashMsgActions {
    setFlashMsg: Action<FlashMsgState, FlashMsgState>;
    clear: Action<FlashMsgState>;
}
export declare type FlashMsgStore = FlashMsgState & FlashMsgActions;
declare const flashMsg: FlashMsgStore;
export default flashMsg;
