/// <reference types="react" />
import { RouteMapItem } from '../../../../router/routeMapParser';
import EntityService from '../../../../services/entity/EntityService';
import { handleMultiselectChangeType } from '../Table/hook/useMultiselectState';
interface ContentCardProps {
    childEntities: Array<RouteMapItem>;
    entityService: EntityService;
    ignoreColumn: string | undefined;
    selectedValues: string[];
    handleChange: handleMultiselectChangeType;
    path: string;
}
declare const ContentCard: (props: ContentCardProps) => JSX.Element;
export default ContentCard;
