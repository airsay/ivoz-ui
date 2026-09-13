import React from 'react';
import EntityService from 'services/entity/EntityService';
import { PropertySpec } from '../../../../services/api/ParsedApiSpecInterface';
interface TableColumnProps {
    columnName: string;
    entityService: EntityService;
    row: Record<string, any>;
    column: PropertySpec;
}
export declare const TableColumn: (props: TableColumnProps) => JSX.Element;
export declare const TableColumnMemo: React.MemoExoticComponent<(props: TableColumnProps) => JSX.Element>;
export {};
