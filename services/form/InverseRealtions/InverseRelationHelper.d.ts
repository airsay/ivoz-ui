import { PropertySpec } from 'services/api';
export declare const collectReferences: (obj: any, references?: PropertySpec[]) => PropertySpec[];
export declare const findMatchingColumns: (columnNames: string[], inverseRelations: PropertySpec[]) => string[];
