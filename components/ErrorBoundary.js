import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, LinearProgress } from '@mui/material';
import { Component } from 'react';
class ErrorBoundary extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            hasError: false,
        };
    }
    static getDerivedStateFromError() {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }
    render() {
        if (!this.state.hasError) {
            return this.props.children;
        }
        if (!this.props.minimalist) {
            return _jsx("h3", { children: "Sorry.. there was an error" });
        }
        const size = {
            xs: 12,
            md: 6,
            lg: 4,
            xl: 3,
        };
        return (_jsxs(Grid, Object.assign({ item: true }, size, { sx: { paddingTop: '50px!important' }, id: 'error' }, { children: [_jsx(LinearProgress, { color: 'error' }), "\u00A0"] })));
    }
}
export default ErrorBoundary;
