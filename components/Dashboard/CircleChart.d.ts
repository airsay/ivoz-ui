/// <reference types="react" />
interface CircleData {
    key?: string;
    percentage: string;
    color: string;
}
export interface CircleProps {
    offsetX?: number;
    offsetY?: number;
    radio?: number;
    width?: number;
    height?: number;
    data: Array<CircleData>;
}
export declare const CircleChart: (props: CircleProps) => JSX.Element;
export {};
