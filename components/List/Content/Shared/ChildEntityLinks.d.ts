/// <reference types="react" />
import { RouteMapItem } from '../../../../router/routeMapParser';
import EntityService from '../../../../services/entity/EntityService';
declare type ChildEntityLinksProps = {
    childEntities: Array<RouteMapItem>;
    row: Record<string, any>;
    entityService: EntityService;
    detail?: React.ReactNode;
    edit?: React.ReactNode;
    deleteMapItem?: RouteMapItem | false;
};
declare const ChildEntityLinks: (props: ChildEntityLinksProps) => JSX.Element;
export default ChildEntityLinks;
