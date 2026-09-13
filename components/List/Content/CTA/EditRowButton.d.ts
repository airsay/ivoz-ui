/// <reference types="react" />
declare type EditRowButtonProps = {
    row: Record<string, any>;
    path: string;
    disabled?: boolean;
};
declare const EditRowButton: (props: EditRowButtonProps) => JSX.Element | null;
export default EditRowButton;
