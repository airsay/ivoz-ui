import { PathMatch } from 'react-router-dom';
import { FkChoices } from '../DefaultEntityBehavior';
import { ForeignKeyGetterType } from '../EntityInterface';
import EntityService, { EntityValues } from '../../services/entity/EntityService';
export interface useFkChoicesArgs {
    foreignKeyGetter: ForeignKeyGetterType;
    entityService: EntityService;
    row?: EntityValues;
    match: PathMatch;
    skip?: Array<string>;
    disabled?: boolean;
}
declare const useFkChoices: (props: useFkChoicesArgs) => FkChoices;
export default useFkChoices;
