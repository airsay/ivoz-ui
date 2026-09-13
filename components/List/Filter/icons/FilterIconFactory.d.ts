/// <reference types="react" />
export declare type OrderFilterType = string;
export declare type SearchFilterType = OrderFilterType | '' | 'exists' | 'partial' | 'start' | 'end' | 'in' | 'all' | 'none' | 'only' | 'exact' | 'eq' | 'neq' | 'lt' | 'lte' | 'gt' | 'gte' | 'between';
interface FilterIconFactoryProps {
    name: SearchFilterType;
    className?: string;
    fontSize?: 'small' | 'inherit' | 'large' | 'medium' | undefined;
    includeLabel?: boolean;
    /**
     * Over a to-many association `in` means "holds any of the given values", which
     * reads nothing like the "Equals" of a plain foreign key
     */
    collection?: boolean;
}
export default function FilterIconFactory(props: FilterIconFactoryProps): JSX.Element;
export declare const getFilterLabel: (value: string, collection?: boolean) => JSX.Element;
export {};
