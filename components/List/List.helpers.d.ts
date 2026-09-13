import { CriteriaFilterValues } from './Filter/ContentFilterDialog';
export declare const criteriaToArray: (where: CriteriaFilterValues) => Array<string>;
export declare const queryStringToCriteria: () => CriteriaFilterValues;
export declare const stringToCriteria: (uri?: string) => CriteriaFilterValues;
