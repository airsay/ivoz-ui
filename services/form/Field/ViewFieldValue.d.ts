/// <reference types="react" />
import { PropertySpec } from '../../api/ParsedApiSpecInterface';
import EntityService from '../..//entity/EntityService';
interface ViewValueProps {
    columnName: string;
    property: PropertySpec;
    entityService: EntityService;
    values: any;
}
declare const ViewFieldValue: (props: ViewValueProps) => JSX.Element | null;
export default ViewFieldValue;
