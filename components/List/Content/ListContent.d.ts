/// <reference types="react" />
import { CancelToken } from 'axios';
import { Location } from 'history';
import { PathMatch } from 'react-router-dom';
import { EntityItem, RouteMapItem } from '../../../router/routeMapParser';
import EntityService from '../../../services/entity/EntityService';
export interface ListContentProps {
    childEntities: Array<RouteMapItem>;
    path: string;
    entityService: EntityService;
    ignoreColumn: string | undefined;
    preloadData: boolean;
    cancelToken: CancelToken;
    match: PathMatch;
    routeChain: Array<EntityItem>;
    location: Location<Record<string, string> | undefined>;
    className?: string;
    empty: boolean;
}
declare const _default: import("react").ForwardRefExoticComponent<ListContentProps & import("react").RefAttributes<any>>;
export default _default;
