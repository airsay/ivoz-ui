/// <reference types="react" />
export declare const StyledDivider: import("@emotion/styled").StyledComponent<{
    absolute?: boolean | undefined;
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material").DividerClasses> | undefined;
    flexItem?: boolean | undefined;
    light?: boolean | undefined;
    orientation?: "horizontal" | "vertical" | undefined;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
    textAlign?: "left" | "right" | "center" | undefined;
    variant?: "inset" | "middle" | "fullWidth" | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLHRElement>, HTMLHRElement>, "key" | keyof import("react").HTMLAttributes<HTMLHRElement>> & {
    ref?: ((instance: HTMLHRElement | null) => void) | import("react").RefObject<HTMLHRElement> | null | undefined;
}, "children" | "textAlign" | keyof import("@mui/material/OverridableComponent").CommonProps | "sx" | "variant" | "orientation" | "absolute" | "light" | "flexItem"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const StyledMenuList: import("@emotion/styled").StyledComponent<{
    children?: import("react").ReactNode;
    classes?: Partial<import("@mui/material").ListClasses> | undefined;
    dense?: boolean | undefined;
    disablePadding?: boolean | undefined;
    subheader?: import("react").ReactNode;
    sx?: import("@mui/material").SxProps<import("@mui/material").Theme> | undefined;
} & import("@mui/material/OverridableComponent").CommonProps & Omit<Pick<import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLUListElement>, HTMLUListElement>, "key" | keyof import("react").HTMLAttributes<HTMLUListElement>> & {
    ref?: ((instance: HTMLUListElement | null) => void) | import("react").RefObject<HTMLUListElement> | null | undefined;
}, "children" | keyof import("@mui/material/OverridableComponent").CommonProps | "sx" | "dense" | "disablePadding" | "subheader"> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
export declare const StyledHomeIcon: import("@emotion/styled").StyledComponent<Record<string, unknown> & import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme>, {}, {}>;
