/// <reference types="react" />
import EntityService from 'services/entity/EntityService';
import { RouteMapItem } from '../../../../router/routeMapParser';
import { handleMultiselectChangeType } from './hook/useMultiselectState';
export interface ContentTableProps {
    childEntities: Array<RouteMapItem>;
    entityService: EntityService;
    ignoreColumn: string | undefined;
    path: string;
    selectedValues: string[];
    handleChange: handleMultiselectChangeType;
    setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>;
    className?: string;
}
declare const ContentTable: (props: ContentTableProps) => JSX.Element;
export default ContentTable;
