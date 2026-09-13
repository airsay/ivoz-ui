/* eslint-disable no-script-url */
import { useState, useEffect } from 'react';
import { useStoreState } from '../store';
const useCancelToken = function () {
    const cancelTokenSourceFactory = useStoreState((store) => store.api.reqCancelTokenSourceFactory);
    const [cancelTokenSource] = useState(cancelTokenSourceFactory());
    const [mounted, setMounted] = useState(true);
    const cancelToken = cancelTokenSource.token;
    useEffect(() => {
        // Make this compatible with react strict mode
        setMounted(true);
        return () => {
            setMounted(false);
            cancelTokenSource.cancel();
        };
    }, [cancelTokenSource]);
    return [mounted, cancelToken];
};
export default useCancelToken;
