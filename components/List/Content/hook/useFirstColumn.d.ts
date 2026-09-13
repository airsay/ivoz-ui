import { PropertySpec } from '../../../../services';
import EntityService from '../../../../services/entity/EntityService';
declare type useFirstColumnProps = {
    entityService: EntityService;
    ignoreColumn: string | undefined;
};
declare const useFirstColumn: (props: useFirstColumnProps) => [string, PropertySpec];
export default useFirstColumn;
