/// <reference types="react" />
import { RouteMapItem } from '../../../../router';
import EntityService, { EntityValues } from '../../../../services/entity/EntityService';
interface MoreChildEntityLinksProps {
    childEntities: Array<RouteMapItem>;
    row: EntityValues;
    entityService: EntityService;
    deleteMapItem?: RouteMapItem | false;
}
export declare const MoreMenuItem: import("@mui/material").ExtendButtonBase<import("@mui/material/MenuItem").MenuItemTypeMap<{}, "li">>;
export declare const MoreChildEntityLinks: (props: MoreChildEntityLinksProps) => JSX.Element;
export {};
