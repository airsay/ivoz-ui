import { useFormik } from 'formik';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRememberValues, useStoredValues } from './useRememberValues';
const useFormHandler = (props) => {
    const { create, entityService, fixedValues, filterValues, filterBy, initialValues, onSubmit: onSubmitCallback, } = props;
    const params = useParams();
    const instanceRef = useRef();
    const [firstRun, setFirstRun] = useState(true);
    const storedValues = useStoredValues();
    const formik = useFormik({
        initialValues,
        validate: (values) => {
            var _a, _b;
            const visibleFields = ((_a = instanceRef.current) === null || _a === void 0 ? void 0 : _a.visibleFields) || [];
            if (filterValues) {
                for (const idx in filterValues) {
                    // Sanitize values like type[exact]
                    const sanitizedIdx = ((_b = idx.match(/^[^[]+/)) === null || _b === void 0 ? void 0 : _b[0]) || '';
                    if (!sanitizedIdx) {
                        continue;
                    }
                    if (Array.isArray(filterValues[idx])) {
                        continue;
                    }
                    values[sanitizedIdx] = filterValues[idx];
                }
            }
            if (fixedValues) {
                for (const idx in fixedValues) {
                    values[idx] = fixedValues[idx];
                }
            }
            if (create && filterBy) {
                const paramValue = Object.values(params).pop();
                values[filterBy] = isNaN(paramValue)
                    ? paramValue
                    : Number(paramValue);
            }
            const visualToggles = entityService.getVisualToggles(values);
            const allProperties = entityService.getAllProperties();
            const properties = {};
            for (const name in allProperties) {
                if (name.includes('.')) {
                    const rootPropertyName = name.split('.').shift() || '';
                    if (!visibleFields.includes(rootPropertyName)) {
                        continue;
                    }
                    const rootProperty = allProperties[rootPropertyName];
                    if (rootProperty === null || rootProperty === void 0 ? void 0 : rootProperty.required) {
                        allProperties[name].required = true;
                    }
                }
                else {
                    if (!visibleFields.includes(name)) {
                        continue;
                    }
                }
                properties[name] = allProperties[name];
            }
            const validationErrors = props.validator(values, properties, visualToggles);
            return validationErrors;
        },
        onSubmit: (values, imperativeMethods) => {
            var _a;
            const visibleFields = ((_a = instanceRef.current) === null || _a === void 0 ? void 0 : _a.visibleFields) || [];
            const filteredValues = {};
            for (const idx in values) {
                if (!visibleFields.includes(idx)) {
                    continue;
                }
                filteredValues[idx] = values[idx];
            }
            onSubmitCallback(filteredValues, imperativeMethods);
        },
    });
    if (firstRun && Object.keys(storedValues).length) {
        setFirstRun(false);
        formik.setValues(Object.assign(Object.assign({}, formik.values), storedValues));
    }
    useRememberValues(formik);
    instanceRef.current = formik;
    return formik;
};
export { useFormHandler };
