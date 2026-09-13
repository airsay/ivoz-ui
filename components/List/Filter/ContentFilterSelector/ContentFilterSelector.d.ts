/// <reference types="react" />
import { NullablePropertyFkChoices } from '../../../../entities/DefaultEntityBehavior';
import EntityService from '../../../../services/entity/EntityService';
import { CriteriaFilterValues } from '../ContentFilterDialog';
export interface ContentFilterRowProps {
    entityService: EntityService;
    fkChoices: {
        [fldName: string]: NullablePropertyFkChoices;
    };
    commitCriteria: (data: CriteriaFilterValues) => void;
    path: string;
    className?: string;
    ignoreColumn: string | undefined;
    close: () => void;
}
export default function ContentFilterSelector(props: ContentFilterRowProps): JSX.Element;
