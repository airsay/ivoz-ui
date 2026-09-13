import React, { FormEvent } from 'react';
interface ConfirmEditDialogProps {
    text: React.ReactNode;
    open: boolean;
    formEvent?: FormEvent<HTMLFormElement>;
    handleClose: () => void;
    handleSave: (e: FormEvent<HTMLFormElement>) => void;
}
export declare const ConfirmEditionDialog: (props: ConfirmEditDialogProps) => JSX.Element;
export {};
