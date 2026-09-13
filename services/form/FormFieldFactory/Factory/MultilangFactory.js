import { jsx as _jsx } from "react/jsx-runtime";
import Multilang from '../../..//form/Field/Multilang';
export const MultilangFactory = (props) => {
    const { fld, property, properties, disabled, hasChanged, inputProps, InputProps, changeHandler, handleBlur, formik, } = props;
    return (_jsx(Multilang, { property: property, properties: properties, _columnName: fld, readOnly: disabled, disabled: disabled, formik: formik, values: formik.values, changeHandler: changeHandler, onBlur: handleBlur, hasChanged: hasChanged, choices: null, InputProps: InputProps, inputProps: inputProps }));
};
