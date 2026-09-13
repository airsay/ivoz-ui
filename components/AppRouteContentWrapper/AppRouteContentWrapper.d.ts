/// <reference types="react" />
import { RouteMap } from '../../router/routeMapParser';
export interface AppRouteContentProps {
    routeMap: RouteMap;
    loggedIn: boolean;
    children: JSX.Element;
    className?: string;
}
export default function AppRouteContentWrapper(props: AppRouteContentProps): JSX.Element;
