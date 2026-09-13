/// <reference types="react" />
import { SxProps, Theme } from '@mui/material';
interface Button {
    label: React.ReactNode;
    onClick: (event: React.MouseEvent) => void;
    autoFocus?: boolean;
    variant?: 'outlined' | 'solid';
    disabled?: boolean;
}
interface ModalContentProps {
    title: React.ReactNode;
    description?: React.ReactNode;
    children: React.ReactNode;
    sx?: SxProps<Theme>;
    open: boolean;
    onClose: () => void;
    buttons?: Button[];
    icon?: string;
    keepMounted?: boolean;
}
export default function Modal(props: ModalContentProps): JSX.Element;
export {};
