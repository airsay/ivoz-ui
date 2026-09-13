/// <reference types="react" />
import { handleMultiselectChangeType } from '../Table/hook/useMultiselectState';
interface CardSelectorProps {
    row: Record<string, any>;
    selectable: boolean;
    selectedValues: string[];
    handleChange: handleMultiselectChangeType;
}
export declare const CardSelector: (props: CardSelectorProps) => JSX.Element | null;
export {};
