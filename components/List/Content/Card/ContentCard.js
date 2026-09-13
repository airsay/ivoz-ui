import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useStoreState } from 'store';
import { StyledContentCardBody } from './ContentCardBody.style';
const ContentCard = (props) => {
    const { childEntities, entityService, path, ignoreColumn, selectedValues, handleChange, } = props;
    const rows = useStoreState((state) => state.list.rows);
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getCollectionColumns(storeState);
    const visibleColumns = Object.fromEntries(Object.entries(columns).filter(([key]) => key !== ignoreColumn));
    return (_jsx(_Fragment, { children: rows.map((row, key) => {
            return (_jsx(StyledContentCardBody, { childEntities: childEntities, entityService: entityService, ignoreColumn: ignoreColumn, selectedValues: selectedValues, handleChange: handleChange, path: path, visibleColumns: visibleColumns, row: row }, `${key}-${row.id}`));
        }) }));
};
export default ContentCard;
