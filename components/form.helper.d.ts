import { EntityItem } from '../router/routeMapParser';
import { PropertySpec } from 'services/api';
declare type GetMarshallerWhiteListPropsType = Pick<EntityItem, 'filterBy' | 'filterValues' | 'fixedValues'>;
declare const getMarshallerWhiteList: (props: GetMarshallerWhiteListPropsType) => string[];
declare const collectReferences: (obj: any, references?: PropertySpec[]) => PropertySpec[];
declare const findMatchingColumns: (columnNames: string[], inverseRelations: PropertySpec[]) => string[];
export { getMarshallerWhiteList, collectReferences, findMatchingColumns };
