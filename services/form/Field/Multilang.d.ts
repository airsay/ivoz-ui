/// <reference types="react" />
import { InputBaseProps, OutlinedInputProps } from '@mui/material';
import { PartialPropertyList } from 'services/api';
import { Language } from 'store/i18n';
import { PropertyCustomFunctionComponentProps } from './CustomComponentWrapper';
declare type Languages = {
    [k: string]: Language;
};
interface MultilangPropsInterface extends PropertyCustomFunctionComponentProps<Languages> {
    properties: PartialPropertyList;
    InputProps?: Partial<OutlinedInputProps>;
    inputProps: InputBaseProps['inputProps'];
}
declare const Multilang: React.FC<MultilangPropsInterface>;
export default Multilang;
