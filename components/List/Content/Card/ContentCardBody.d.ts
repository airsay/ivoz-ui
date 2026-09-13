/// <reference types="react" />
import { RouteMapItem } from '../../../../router/routeMapParser';
import { EntityValues, PropertySpec } from '../../../../services';
import EntityService from '../../../../services/entity/EntityService';
import { handleMultiselectChangeType } from '../Table/hook/useMultiselectState';
export interface ContentCardProps {
    childEntities: Array<RouteMapItem>;
    entityService: EntityService;
    ignoreColumn: string | undefined;
    selectedValues: string[];
    handleChange: handleMultiselectChangeType;
    path: string;
    visibleColumns: {
        [k: string]: PropertySpec;
    };
    row: EntityValues;
    className?: string;
}
declare const ContentCardBody: (props: ContentCardProps) => JSX.Element;
export default ContentCardBody;
