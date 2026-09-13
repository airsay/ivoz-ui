import { jsx as _jsx } from "react/jsx-runtime";
import { Trans } from 'react-i18next';
export default function translate(key, values = {}, components = {}) {
    const { count } = values;
    return (_jsx(Trans, { defaults: key, count: count, values: values, components: components }));
}
