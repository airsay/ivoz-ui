/// <reference types="react" />
import { RouteMapBlock, RouteMapItem } from '../../../router/routeMapParser';
interface menuBlockProps {
    routeMapBlock: RouteMapItem | RouteMapBlock;
    idx: string | number;
}
export default function MenuBlock(props: menuBlockProps): JSX.Element;
export {};
