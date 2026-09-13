/// <reference types="react" />
import { PropertySpec } from '../../../services/api/ParsedApiSpecInterface';
import EntityService from '../../../services/entity/EntityService';
interface ListContentValueProps {
    columnName: string;
    column: PropertySpec;
    row: Record<string, any>;
    entityService: EntityService;
}
declare const ListContentValue: (props: ListContentValueProps) => JSX.Element;
export default ListContentValue;
