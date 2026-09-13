/// <reference types="react" />
import { NullablePropertyFkChoices } from '../../../../entities';
import { PropertyList } from '../../../../services/api/ParsedApiSpecInterface';
import { DropdownChoices } from '../../../../services/form/Field/Dropdown';
import { CriteriaFilterValue } from '../ContentFilterDialog';
export interface ContentFilterRowProps {
    idx: number;
    filters: {
        [key: string]: Array<string>;
    };
    row: CriteriaFilterValue;
    columns: PropertyList;
    fkChoices: {
        [fldName: string]: NullablePropertyFkChoices;
    };
    fieldNames: DropdownChoices;
    isLast: boolean;
    setRow: (idx: number, name: string, type: string, value: string) => void;
    removeRow: (idx: number) => void;
    className?: string;
}
export default function ContentFilterRow(props: ContentFilterRowProps): JSX.Element | null;
