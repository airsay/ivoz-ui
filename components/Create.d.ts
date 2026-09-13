/// <reference types="react" />
import { EntityFormType } from '../entities/DefaultEntityBehavior';
import EntityInterface from '../entities/EntityInterface';
import { RouteMap } from '../router/routeMapParser';
import EntityService from '../services/entity/EntityService';
declare type CreateProps = EntityInterface & {
    entityService: EntityService;
    routeMap: RouteMap;
    Form: () => Promise<EntityFormType>;
};
declare const Create: (props: CreateProps) => JSX.Element | null;
export default Create;
