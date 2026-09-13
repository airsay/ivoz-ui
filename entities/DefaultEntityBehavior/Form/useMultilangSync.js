import { useRef } from 'react';
export const useMultilangSync = ({ formik, languages, changeHandler, }) => {
    const propagateTimeoutRef = useRef(null);
    const latestTypingRef = useRef(null);
    const handleChange = (e) => {
        changeHandler(e);
        const [fieldKey, currentLang] = e.target.name.split('.');
        const currentValue = e.target.value;
        latestTypingRef.current = { lang: currentLang, value: currentValue };
        if (propagateTimeoutRef.current) {
            clearTimeout(propagateTimeoutRef.current);
        }
        propagateTimeoutRef.current = setTimeout(() => {
            if (!latestTypingRef.current) {
                return;
            }
            const { lang: typingLang, value: typingValue } = latestTypingRef.current;
            const updatedValues = {};
            languages.forEach((lng) => {
                var _a, _b, _c;
                const locale = (_b = (_a = lng.locale) === null || _a === void 0 ? void 0 : _a.split('-')[0]) !== null && _b !== void 0 ? _b : 'en';
                const existingVal = (_c = formik === null || formik === void 0 ? void 0 : formik.values[fieldKey]) === null || _c === void 0 ? void 0 : _c[locale];
                updatedValues[locale] =
                    locale === typingLang || !(existingVal === null || existingVal === void 0 ? void 0 : existingVal.trim())
                        ? typingValue
                        : existingVal;
            });
            formik === null || formik === void 0 ? void 0 : formik.setFieldValue(fieldKey, updatedValues);
        }, 1800);
    };
    return { handleChange };
};
