/// <reference types="react" />
import { PropertySpec } from '../../../../services';
import EntityService, { EntityValues } from '../../../../services/entity/EntityService';
import { handleMultiselectChangeType } from '../Table/hook/useMultiselectState';
interface ContentCardProps {
    columnName: string;
    multiselect: boolean;
    isFirstRow: boolean;
    column: PropertySpec;
    row: EntityValues;
    entityService: EntityService;
    selectedValues: string[];
    handleMultiselectChange: handleMultiselectChangeType;
    expanded: boolean;
    setExpanded: (value: boolean) => void;
}
declare const ContentCardRow: (props: ContentCardProps) => JSX.Element;
export default ContentCardRow;
