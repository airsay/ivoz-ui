import { useStoreState } from '../../../../store';
const useFirstColumn = (props) => {
    const { entityService, ignoreColumn } = props;
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getCollectionColumns(storeState);
    const firstColumnKey = Object.keys(columns).find((columnKey) => columnKey !== ignoreColumn);
    const firstColumnSpec = entityService.getProperties()[firstColumnKey];
    return [firstColumnKey, firstColumnSpec];
};
export default useFirstColumn;
