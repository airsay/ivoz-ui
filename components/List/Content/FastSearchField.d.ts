/// <reference types="react" />
import EntityService from '../../../services/entity/EntityService';
export interface FastSearchFieldProps {
    className?: string;
    path: string;
    entityService: EntityService;
    ignoreColumn: string | undefined;
}
declare const _default: import("react").ForwardRefExoticComponent<FastSearchFieldProps & import("react").RefAttributes<any>>;
export default _default;
