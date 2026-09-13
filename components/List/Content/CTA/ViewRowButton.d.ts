/// <reference types="react" />
declare type EditRowButtonProps = {
    row: Record<string, any>;
    path: string;
};
declare const ViewRowButton: (props: EditRowButtonProps) => JSX.Element;
export default ViewRowButton;
