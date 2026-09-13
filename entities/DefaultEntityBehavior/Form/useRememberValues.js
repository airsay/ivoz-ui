import useCurrentPathMatch from '../../../hooks/useCurrentPathMatch';
import { useEffect, useState } from 'react';
const SESSION_STORAGE_KEY = 'ivoz-ui-stored-form-values';
const useStoredValues = function () {
    var _a;
    const match = useCurrentPathMatch();
    const [response, setResponse] = useState({});
    const storedValues = JSON.parse(sessionStorage.getItem(SESSION_STORAGE_KEY));
    const reloadedPage = (_a = window === null || window === void 0 ? void 0 : window.performance) === null || _a === void 0 ? void 0 : _a.getEntriesByType('navigation').filter((nav) => nav.name === (window === null || window === void 0 ? void 0 : window.location.href)).map((nav) => nav.type).includes('reload');
    const applyStoredValues = reloadedPage &&
        storedValues &&
        storedValues.url === match.pathname &&
        JSON.stringify(storedValues.values) !== JSON.stringify(response);
    if (applyStoredValues) {
        setResponse(storedValues.values);
    }
    return response;
};
const useRememberValues = function (formik) {
    const match = useCurrentPathMatch();
    useEffect(() => {
        const onUnload = () => {
            const changedValues = {};
            for (const idx in formik.values) {
                if (formik.values[idx] === formik.initialValues[idx]) {
                    continue;
                }
                changedValues[idx] = formik.values[idx];
            }
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify({
                url: match.pathname,
                values: changedValues,
            }));
        };
        window.onbeforeunload = onUnload;
        return () => {
            window.onbeforeunload = null;
            sessionStorage.removeItem(SESSION_STORAGE_KEY);
        };
    }, [formik]);
};
export { useRememberValues, useStoredValues };
