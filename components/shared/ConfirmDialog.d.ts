import React from 'react';
interface ConfirmDialogProps {
    text: React.ReactNode;
    open: boolean;
    doubleCheck?: boolean;
    doubleCheckExpectedStr?: string;
    handleClose: () => void;
    handleApply: (event: React.MouseEvent) => void;
}
export default function ConfirmDialog(props: ConfirmDialogProps): JSX.Element;
export {};
