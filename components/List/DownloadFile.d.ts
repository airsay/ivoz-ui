/// <reference types="react" />
export interface DownloadFileProps {
    row: Record<string, any>;
    path: string;
    fileType: string;
}
export default function DownloadFile(props: DownloadFileProps): JSX.Element;
