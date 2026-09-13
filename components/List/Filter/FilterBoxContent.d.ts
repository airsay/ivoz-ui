/// <reference types="react" />
export interface FilterDialogContentProps {
    className?: string;
    close: () => void;
    apply: (waitForStateUpdate: boolean) => void;
    children: Array<JSX.Element | null> | JSX.Element | null;
}
export default function FilterBoxContent(props: FilterDialogContentProps): JSX.Element;
