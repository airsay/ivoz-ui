/// <reference types="react" />
import { EntityItem } from '../../../../router';
declare type ChildEntityLinkProps = {
    row: Record<string, any>;
    routeMapItem: EntityItem;
    disabled?: boolean;
};
declare const ChildEntityLink: (props: ChildEntityLinkProps) => JSX.Element;
export default ChildEntityLink;
