import { ChangeEvent } from 'react';
export declare type handleMultiselectChangeType = (event: ChangeEvent<HTMLInputElement>) => void;
declare const useMultiselectState: () => readonly [string[], handleMultiselectChangeType, import("react").Dispatch<import("react").SetStateAction<string[]>>];
export default useMultiselectState;
