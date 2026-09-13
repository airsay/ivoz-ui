/// <reference types="react" />
import EntityInterface from '../../entities/EntityInterface';
import { EntityValues } from '../../services';
export interface HistoryTrackerLinkProps {
    to: string;
    children: JSX.Element | string | number;
    className?: string;
    parentEntity?: EntityInterface;
    parentRow?: EntityValues;
    target?: string;
}
declare const HistoryTrackerLink: import("react").ForwardRefExoticComponent<Pick<any, string | number | symbol> & import("react").RefAttributes<any>>;
export default HistoryTrackerLink;
