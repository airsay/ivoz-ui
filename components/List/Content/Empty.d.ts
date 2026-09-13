/// <reference types="react" />
import EntityService from '../../../services/entity/EntityService';
export interface EmptyProps {
    entityService: EntityService;
    className?: string;
}
export declare const Empty: (props: EmptyProps) => JSX.Element;
export default Empty;
