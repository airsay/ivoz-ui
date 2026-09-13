import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { Grid } from '@mui/material';
import { isPropertyEmbeddable } from '../../../services/api/ParsedApiSpecInterface';
import { isDetailedFormFieldSpec, } from '../FilterFieldsetGroups';
export const FormField = (props) => {
    const { column, fkChoices, visualToggles, readOnlyProperties, formFieldFactory, } = props;
    const columnName = typeof column === 'string' ? column : column.name;
    const choices = fkChoices
        ? fkChoices[columnName]
        : null;
    if (!visualToggles[columnName]) {
        return null;
    }
    const visibilityStyles = visualToggles[columnName]
        ? { display: 'block' }
        : { display: 'none' };
    const readOnly = readOnlyProperties && readOnlyProperties[columnName] ? true : false;
    const defaultSizes = {
        xs: 12,
        md: 6,
        lg: 4,
        xl: 3,
    };
    const sizes = isDetailedFormFieldSpec(column)
        ? Object.assign(Object.assign({}, defaultSizes), column.size) : defaultSizes;
    return (_jsx(Grid, Object.assign({ item: true }, sizes, { style: visibilityStyles }, { children: formFieldFactory.getFormField(columnName, choices, readOnly) })));
};
const FormFieldMemo = React.memo(FormField, (prev, next) => {
    const columnSpec = prev.column;
    const columnName = isDetailedFormFieldSpec(columnSpec)
        ? columnSpec.name
        : columnSpec;
    const nextColumnSpec = next.column;
    const nextColumnName = isDetailedFormFieldSpec(nextColumnSpec)
        ? nextColumnSpec.name
        : nextColumnSpec;
    const column = prev.formFieldFactory.getProperty(columnName);
    if (!column) {
        throw `Unknown property ${columnName}`;
    }
    if (column.memoize === false) {
        return false;
    }
    if (isPropertyEmbeddable(column) && column.multilang === true) {
        return false;
    }
    const prevFkChoices = prev.fkChoices ? prev.fkChoices[columnName] : null;
    const nextFkChoices = next.fkChoices ? next.fkChoices[columnName] : null;
    const prevReadOnlyProperties = prev.readOnlyProperties
        ? prev.readOnlyProperties[columnName]
        : null;
    const nextReadOnlyProperties = next.readOnlyProperties
        ? next.readOnlyProperties[columnName]
        : null;
    const prevVisualToggle = prev.visualToggles
        ? prev.visualToggles[columnName]
        : null;
    const nextVisualToggle = next.visualToggles
        ? next.visualToggles[columnName]
        : null;
    const prevFormik = prev.formFieldFactory.formik;
    const nextFormik = next.formFieldFactory.formik;
    const columnNameSegments = columnName.split('.');
    const prevFormikValue = columnNameSegments.length > 1
        ? prevFormik.values[columnNameSegments[0]][columnNameSegments[1]]
        : prevFormik.values[columnName];
    const nextFormikValue = columnNameSegments.length > 1
        ? nextFormik.values[columnNameSegments[0]][columnNameSegments[1]]
        : nextFormik.values[columnName];
    const prevTouchedSubproperty = prevFormik.touched[columnNameSegments[0]];
    const prevFormikTouched = columnNameSegments.length > 1 && prevTouchedSubproperty
        ? prevTouchedSubproperty[columnNameSegments[1]]
        : prevFormik.touched[columnName];
    const nextTouchedSubproperty = nextFormik.touched[columnNameSegments[0]];
    const nextFormikTouched = columnNameSegments.length > 1 && nextTouchedSubproperty
        ? nextTouchedSubproperty[columnNameSegments[1]]
        : nextFormik.touched[columnName];
    const prevErrorSubproperty = prevFormik.errors[columnNameSegments[0]];
    const prevFormikError = columnNameSegments.length > 1 && prevErrorSubproperty
        ? prevErrorSubproperty[columnNameSegments[1]]
        : prevFormik.errors[columnName];
    const nextErrorSubproperty = nextFormik.errors[columnNameSegments[0]];
    const nextFormikError = columnNameSegments.length > 1 && nextErrorSubproperty
        ? nextErrorSubproperty[columnNameSegments[1]]
        : nextFormik.errors[columnName];
    return (columnName === nextColumnName &&
        prevFkChoices === nextFkChoices &&
        prevReadOnlyProperties === nextReadOnlyProperties &&
        prevFormikValue === nextFormikValue &&
        prevFormikTouched === nextFormikTouched &&
        prevFormikError === nextFormikError &&
        prevVisualToggle === nextVisualToggle);
});
export default FormFieldMemo;
