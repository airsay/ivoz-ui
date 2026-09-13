import { GridSize } from '@mui/material';
import * as React from 'react';
declare type DetailedFormFieldSpec = {
    name: string;
    size: {
        md?: boolean | GridSize;
        lg?: boolean | GridSize;
        xl?: boolean | GridSize;
    };
};
export declare const isDetailedFormFieldSpec: (property: FieldsetGroupsField) => property is DetailedFormFieldSpec;
export declare type FieldsetGroupsField = string | DetailedFormFieldSpec;
export declare type FieldsetGroups = {
    legend: string | React.ReactElement;
    fields: Array<FieldsetGroupsField | false | undefined>;
};
declare const filterFieldsetGroups: (groups: Array<FieldsetGroups | false>) => Array<FieldsetGroups>;
export default filterFieldsetGroups;
