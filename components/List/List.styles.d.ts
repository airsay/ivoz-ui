import { Theme } from '@mui/material';
export declare const StyledList: import("@mui/styles").StyledComponent<Omit<import("../../entities/EntityInterface").default & {
    path: string;
    routeMap: import("../..").RouteMap<import("../..").RouteMapItem>;
    entityService: import("../../services/entity/EntityService").default<import("easy-peasy").StateMapper<import("easy-peasy").FilterActionTypes<import("../..").IvozStore>>>;
    foreignKeyResolver: () => Promise<import("../..").foreignKeyResolverType>;
    className?: string | undefined;
}, "classes" | "className"> & import("@mui/styles").StyledComponentProps<"root"> & Omit<{
    theme: Theme;
}, "className" | "theme"> & {
    className?: string | undefined;
    theme?: Theme | undefined;
}>;
