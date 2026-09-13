import { MouseEvent } from 'react';
import { PropertyCustomFunctionComponentProps } from '../../CustomComponentWrapper';
import { FileProps } from '../FileUploader';
interface FileUploaderProps<T> extends PropertyCustomFunctionComponentProps<T> {
    downloadPath: string;
    accept?: string;
    handleDownload: (e: MouseEvent) => Promise<void>;
}
declare type FileUploaderPropsType = FileUploaderProps<{
    [k: string]: FileProps;
}>;
export declare type FileUploaderType = React.FunctionComponent<FileUploaderPropsType>;
declare const RegularFileUploader: FileUploaderType;
export default RegularFileUploader;
