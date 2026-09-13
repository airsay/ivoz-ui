/// <reference types="react" />
import { RouteMap } from '../../../../router/routeMapParser';
declare type BreadcrumbsProps = {
    routeMap: RouteMap;
    desktop: boolean;
};
declare const Breadcrumbs: (props: BreadcrumbsProps) => JSX.Element | null;
export default Breadcrumbs;
