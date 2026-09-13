/// <reference types="react" />
import EntityService from '../../../../../services/entity/EntityService';
import { handleMultiselectChangeType } from '../hook/useMultiselectState';
interface ContentTableHead {
    entityService: EntityService;
    ignoreColumn: string | undefined;
    multiselect: boolean;
    indeterminateSelectAll: boolean;
    checked: boolean;
    selectAll: handleMultiselectChangeType;
}
declare const ContentTableHead: (props: ContentTableHead) => JSX.Element;
export default ContentTableHead;
