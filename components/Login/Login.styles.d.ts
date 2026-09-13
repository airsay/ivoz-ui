/// <reference types="react" />
import { Theme } from '@mui/material';
export declare const StyledLogin: import("@emotion/styled").StyledComponent<import("./Login").LoginProps & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export declare const StyledAvatar: import("@emotion/styled").StyledComponent<{
    alt?: string | undefined;
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material").AvatarClasses> | undefined;
    imgProps?: (import("react").ImgHTMLAttributes<HTMLImageElement> & {
        sx?: import("@mui/material").SxProps<Theme> | undefined;
    }) | undefined;
    sizes?: string | undefined;
    src?: string | undefined;
    srcSet?: string | undefined;
    sx?: import("@mui/material").SxProps<Theme> | undefined;
    variant?: "square" | "rounded" | "circular" | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, keyof import("react").HTMLAttributes<HTMLDivElement> | "key"> & {
    ref?: ((instance: HTMLDivElement | null) => void) | import("react").RefObject<HTMLDivElement> | null | undefined;
}, "children" | keyof import("@mui/material/OverridableComponent").CommonProps | "sx" | "variant" | "sizes" | "alt" | "src" | "srcSet" | "imgProps"> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
interface StyledFormProps {
    children: React.ReactNode;
    className?: string;
    onSubmit: React.FormEventHandler;
}
export declare const StyledForm: import("@emotion/styled").StyledComponent<StyledFormProps & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
interface StyledSubmitButton {
    children: React.ReactNode;
    className?: string;
    variant: 'text' | 'outlined' | 'contained' | undefined;
}
export declare const StyledSubmitButton: import("@emotion/styled").StyledComponent<StyledSubmitButton & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export {};
