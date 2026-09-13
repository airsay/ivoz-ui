import { CancelToken } from 'axios';
import EntityInterface from '../entities/EntityInterface';
import { EntityValues } from '../services';
declare type useParentRowProps = {
    parentEntity: EntityInterface;
    parentId?: string | number | undefined;
    cancelToken?: CancelToken;
};
declare const useParentRow: <T extends Record<string, unknown> = EntityValues>(props: useParentRowProps) => T | null | undefined;
export default useParentRow;
