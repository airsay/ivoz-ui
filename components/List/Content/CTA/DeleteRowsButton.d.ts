/// <reference types="react" />
import EntityService from '../../../../services/entity/EntityService';
interface DeleteRowsButtonProps {
    entityService: EntityService;
    selectedValues: Array<string | number>;
    variant?: 'icon' | 'text';
}
declare const DeleteRowsButton: (props: DeleteRowsButtonProps) => JSX.Element;
export default DeleteRowsButton;
