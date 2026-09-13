import { CancelToken } from 'axios';
import { EntityValues } from '../entity/EntityService';
import EntityInterface from '../../entities/EntityInterface';
export interface GenericForeignKeyResolverProps {
    data: Array<EntityValues> | EntityValues;
    fkFld: string;
    entity: EntityInterface;
    addLink?: boolean;
    dataPreprocesor?: (data: Record<string, any>) => Promise<void>;
    cancelToken?: CancelToken;
}
export declare const entityObject2ListLink: (props: GenericForeignKeyResolverProps, data: EntityValues[], response: any) => Promise<void>;
export default function genericForeignKeyResolver(props: GenericForeignKeyResolverProps): Promise<Array<EntityValues> | EntityValues>;
export declare const remapFk: (row: EntityValues, from: string, to: string) => void;
