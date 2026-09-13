import React, { Component, ErrorInfo, ReactNode } from 'react';
interface Props {
    children?: ReactNode;
    minimalist?: boolean;
}
interface State {
    hasError: boolean;
}
declare class ErrorBoundary extends Component<Props, State> {
    state: State;
    static getDerivedStateFromError(): State;
    componentDidCatch(error: Error, errorInfo: ErrorInfo): void;
    render(): string | number | boolean | JSX.Element | React.ReactFragment | null | undefined;
}
export default ErrorBoundary;
