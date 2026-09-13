/// <reference types="react" />
import { RouteMap } from '../../../router/routeMapParser';
export interface headerProps {
    routeMap: RouteMap;
    className?: string;
}
export default function Header(props: headerProps): JSX.Element;
