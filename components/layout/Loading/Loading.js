import { jsx as _jsx } from "react/jsx-runtime";
import { Fade } from '@mui/material';
import { useStoreState } from 'store';
import { StyledLinearProgress } from './Loading.styles';
export const Loading = (props) => {
    const loading = useStoreState((state) => state.api.loading);
    const { transitionDelay = '800ms' } = props;
    return (_jsx(Fade, Object.assign({ in: loading, style: {
            transitionDelay,
        }, unmountOnExit: true }, { children: _jsx(StyledLinearProgress, {}) })));
};
export default Loading;
