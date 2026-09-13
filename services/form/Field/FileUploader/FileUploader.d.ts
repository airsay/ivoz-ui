/// <reference types="react" />
import { PropertyCustomFunctionComponentProps } from '../CustomComponentWrapper';
export interface FileProps {
    file?: File | null;
    baseName?: string | null;
    fileSize?: number | null;
    mimeType?: string | null;
}
export interface ChangeEventValues {
    name: string;
    value: FileProps;
}
interface FileUploaderProps<T> extends PropertyCustomFunctionComponentProps<T> {
    downloadPath: string | null;
    accept?: string;
}
declare type FileUploaderPropsType = FileUploaderProps<{
    [k: string]: FileProps;
}>;
declare const FileUploader: React.FunctionComponent<FileUploaderPropsType>;
export default FileUploader;
