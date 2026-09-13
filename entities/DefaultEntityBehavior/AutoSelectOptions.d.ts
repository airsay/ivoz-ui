import EntityService from '../../services/entity/EntityService';
import { CancelToken } from 'axios';
import { EntityList } from 'router/parseRoutes';
import { SelectOptionsType } from 'entities/EntityInterface';
declare type AutoSelectOptionsArgs = {
    cancelToken?: CancelToken;
    entities?: EntityList;
    entityService: EntityService;
    skip?: string[];
    response: Record<string, Array<unknown>> | any;
};
export declare const autoSelectOptions: (props: AutoSelectOptionsArgs) => Array<Promise<unknown>>;
declare type AutoSelectOptionHandlersArgs = {
    entityService: EntityService;
    skip?: string[];
};
export declare const autoSelectOptionHandlers: (props: AutoSelectOptionHandlersArgs) => Promise<Record<string, SelectOptionsType>>;
export default autoSelectOptions;
