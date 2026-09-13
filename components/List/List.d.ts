/// <reference types="react" />
import EntityInterface, { foreignKeyResolverType } from '../../entities/EntityInterface';
import { RouteMap } from '../../router/routeMapParser';
import EntityService from '../../services/entity/EntityService';
export declare type ListProps = EntityInterface & {
    path: string;
    routeMap: RouteMap;
    entityService: EntityService;
    foreignKeyResolver: () => Promise<foreignKeyResolverType>;
    className?: string;
};
declare const List: (props: ListProps) => JSX.Element | null;
export default List;
