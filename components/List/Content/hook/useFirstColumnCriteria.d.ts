import { CriteriaFilterValue } from 'components/List/Filter/ContentFilterDialog';
import EntityService from 'services/entity/EntityService';
declare type useFirstCriteriaProps = {
    entityService: EntityService;
    path: string;
    ignoreColumn: string | undefined;
};
declare const useFirstColumnCriteria: (props: useFirstCriteriaProps) => CriteriaFilterValue | undefined;
export default useFirstColumnCriteria;
