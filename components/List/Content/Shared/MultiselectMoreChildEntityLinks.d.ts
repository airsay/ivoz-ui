/// <reference types="react" />
import { ActionItem, RouteMapItem } from '../../../../router';
import EntityService, { EntityValues } from '../../../../services/entity/EntityService';
interface MoreChildEntityLinksProps {
    childActions: ActionItem[];
    rows: Array<EntityValues>;
    entityService: EntityService;
    deleteMapItem?: RouteMapItem | false;
    selectedValues: string[];
}
export declare const MultiselectMoreChildEntityLinks: (props: MoreChildEntityLinksProps) => JSX.Element;
export {};
