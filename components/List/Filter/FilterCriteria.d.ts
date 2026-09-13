/// <reference types="react" />
import { NullablePropertyFkChoices } from '../../../entities/DefaultEntityBehavior';
import EntityService from '../../../services/entity/EntityService';
import { CriteriaFilterValues } from './ContentFilterDialog';
interface FilterCriteriaProps {
    entityService: EntityService;
    fkChoices: {
        [fldName: string]: NullablePropertyFkChoices;
    };
    path: string;
    removeFilter: (index: number) => void;
    criteriaOverride?: CriteriaFilterValues;
}
export declare function FilterCriteria(props: FilterCriteriaProps): JSX.Element | null;
export {};
