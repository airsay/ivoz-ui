import { Action } from 'easy-peasy';
interface AboutInfoState {
    version: string;
    commit: string;
    lastUpdated: string;
}
interface AboutInfoActions {
    setVersion: Action<AboutInfoState, string>;
    setCommit: Action<AboutInfoState, string>;
    setLastUpdated: Action<AboutInfoState, string>;
}
export declare type AboutInfoStore = AboutInfoActions & AboutInfoState;
declare const aboutInfo: AboutInfoStore;
export default aboutInfo;
