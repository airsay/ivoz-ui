/// <reference types="react" />
interface StyledFileUploaderContainer {
    children: React.ReactNode;
    className?: string;
}
export declare const StyledFileUploaderContainer: import("@emotion/styled").StyledComponent<StyledFileUploaderContainer & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
interface StyledUploadButtonLabelProps {
    children: React.ReactNode;
    className?: string;
    htmlFor: string;
}
export declare const StyledUploadButtonLabel: import("@emotion/styled").StyledComponent<StyledUploadButtonLabelProps & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const StyledFileNameContainer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const StyledImageContainer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
interface StyledImagePreviewProps {
    $isReadMode?: boolean;
}
export declare const StyledImagePreview: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & StyledImagePreviewProps, import("react").DetailedHTMLProps<import("react").ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>, {}>;
export declare const StyledTextContainer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export {};
