/// <reference types="react" />
import EntityService from '../../../../services/entity/EntityService';
interface DeleteRowButtonProps {
    row: any;
    entityService: EntityService;
    variant?: 'icon' | 'text';
    disabled?: boolean;
}
declare const DeleteRowButton: (props: DeleteRowButtonProps) => JSX.Element;
export default DeleteRowButton;
