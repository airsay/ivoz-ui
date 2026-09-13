import { jsx as _jsx } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useStoreState } from 'store';
import { StyledFieldset, StyledFieldsetRoot, } from './CustomComponentWrapper.styles';
import { StyledMultilangTextField } from './TextField/TextField.styles';
import { useMultilangSync } from '../../../entities/DefaultEntityBehavior/Form/useMultilangSync';
const Multilang = (props) => {
    const { _columnName, disabled, properties, formik, inputProps, onBlur, changeHandler, } = props;
    let { InputProps } = props;
    const languages = useStoreState((state) => state.i18n.languages);
    const mlValue = (formik === null || formik === void 0 ? void 0 : formik.values[_columnName]) || {};
    const rootProperty = properties[_columnName];
    const { handleChange } = useMultilangSync({
        formik,
        languages,
        changeHandler,
    });
    return (_jsx(StyledFieldsetRoot, Object.assign({ label: rootProperty.label, hasChanged: false, required: rootProperty.required, disabled: disabled, className: 'multilang' }, { children: _jsx(StyledFieldset, { children: _jsx(Box, { children: languages === null || languages === void 0 ? void 0 : languages.map((lng) => {
                    var _a, _b, _c;
                    const locale = (_a = lng.locale.split('-').shift()) !== null && _a !== void 0 ? _a : 'en';
                    const value = mlValue[locale];
                    const name = `${_columnName}.${locale}`;
                    const property = properties[name];
                    const multiline = property.format === 'textarea';
                    const required = (_c = (_b = rootProperty.required) !== null && _b !== void 0 ? _b : property === null || property === void 0 ? void 0 : property.required) !== null && _c !== void 0 ? _c : false;
                    const touched = (formik === null || formik === void 0 ? void 0 : formik.touched[_columnName]) &&
                        (formik === null || formik === void 0 ? void 0 : formik.touched[_columnName])[locale];
                    const error = formik === null || formik === void 0 ? void 0 : formik.errors[name];
                    InputProps = InputProps !== null && InputProps !== void 0 ? InputProps : {};
                    InputProps.startAdornment = (_jsx("span", Object.assign({ className: 'preffix' }, { children: lng.name.substring(0, 3).toUpperCase() })));
                    return (_jsx(StyledMultilangTextField, { name: name, type: 'text', multiline: multiline, value: value, disabled: disabled, label: undefined, required: required, onChange: handleChange, onBlur: onBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, InputProps: Object.assign({}, InputProps), inputProps: inputProps, hasChanged: false, margin: 'dense', size: 'small' }, name));
                }) }) }) })));
};
export default Multilang;
