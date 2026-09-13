/// <reference types="react" />
declare type LoadingProps = {
    transitionDelay?: string;
};
declare type LoadingType = (props: LoadingProps) => JSX.Element;
export declare const Loading: LoadingType;
export default Loading;
