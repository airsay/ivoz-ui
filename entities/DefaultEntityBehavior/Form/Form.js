import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Alert, AlertTitle } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useStoreState } from 'store';
import ErrorBoundary from '../../../components/ErrorBoundary';
import { getMarshallerWhiteList } from '../../../components/form.helper';
import SaveButton from '../../../components/shared/Button/SaveButton';
import ErrorMessage from '../../../components/shared/ErrorMessage';
import { collectReferences, findMatchingColumns, } from '../../../services';
import FormFieldFactory from '../../../services/form/FormFieldFactory';
import _ from '../../../services/translations/translate';
import { StyledGroupGrid, StyledGroupLegend, } from '../../DefaultEntityBehavior.styles';
import useFkChoices from '../../data/useFkChoices';
import filterFieldsetGroups, { isDetailedFormFieldSpec, } from '../FilterFieldsetGroups';
import FormFieldMemo from './FormField';
import { useFormHandler } from './useFormHandler';
import { validationErrosToJsxErrorList } from './validationErrosToJsxErrorList';
import { ConfirmEditionDialog } from '../../../components/shared/ConfirmEditDialog';
const Form = (props) => {
    var _a;
    const { entityService, readOnlyProperties, filterBy, fixedValues, filterValues, foreignKeyGetter: foreignKeyGetterLoader, row, match, edit, } = props;
    const { fkChoices } = props;
    const [showConfirm, setShowConfirm] = useState(false);
    const editDoubleCheck = !edit
        ? false
        : props.entityService.getEntity().editDoubleCheck;
    const [formEvent, setFormEvent] = useState(undefined);
    const [foreignKeyGetter, setForeignKeyGetter] = useState();
    useEffect(() => {
        if (fkChoices) {
            return;
        }
        if (foreignKeyGetter) {
            return;
        }
        foreignKeyGetterLoader().then((fkGetter) => {
            setForeignKeyGetter(() => fkGetter);
        });
    }, [fkChoices, foreignKeyGetter]);
    const autoloadedFkChoices = useFkChoices({
        disabled: fkChoices !== undefined || foreignKeyGetter === undefined,
        foreignKeyGetter: foreignKeyGetter,
        entityService,
        row,
        match,
    });
    const formik = props.formik || useFormHandler(props);
    const reqError = useStoreState((store) => store.api.errorMsg);
    const allProperties = entityService.getAllProperties();
    const columns = entityService.getProperties();
    const columnNames = Object.keys(columns);
    const inverseRelations = collectReferences(columns);
    const inverseRelationsMatch = findMatchingColumns(columnNames, inverseRelations);
    let totalEntitiesUsed = 0;
    inverseRelationsMatch.forEach((value) => {
        if (Array.isArray(row === null || row === void 0 ? void 0 : row[value])) {
            totalEntitiesUsed = (row === null || row === void 0 ? void 0 : row[value]).length + totalEntitiesUsed;
        }
    });
    let groups = [];
    if (props.groups) {
        groups = filterFieldsetGroups(props.groups);
    }
    else {
        groups.push({
            legend: '',
            fields: columnNames,
        });
    }
    const fieldRows = groups.map((group) => {
        const fields = group.fields;
        return fields.map((fld) => {
            return isDetailedFormFieldSpec(fld) ? fld.name : fld;
        });
    });
    const fields = [];
    fieldRows.reduce((accumulator, currentValue) => {
        accumulator.push(...currentValue);
        for (const fld of currentValue) {
            const segments = fld.split('.');
            if (segments.length < 2) {
                continue;
            }
            if (accumulator.includes(segments[0])) {
                continue;
            }
            accumulator.push(segments[0]);
        }
        return accumulator;
    }, fields);
    const mlSubproperties = [];
    for (const fld of fields) {
        if ((_a = allProperties[fld]) === null || _a === void 0 ? void 0 : _a.multilang) {
            for (const propertyName in allProperties) {
                if (propertyName.indexOf(`${fld}.`) === 0) {
                    mlSubproperties.push(propertyName);
                }
            }
        }
    }
    fields.push(...mlSubproperties);
    const visualToggles = entityService.getVisualToggles(formik.values);
    const visibleFields = fields.filter((fldName) => visualToggles[fldName] || false);
    const whitelist = getMarshallerWhiteList({
        filterBy,
        fixedValues,
        filterValues,
    });
    visibleFields.push(...whitelist);
    formik.visibleFields = visibleFields;
    const errorList = validationErrosToJsxErrorList(formik, allProperties);
    const divRef = useRef(null);
    const entity = entityService.getEntity();
    const iden = row ? entity.toStr(row) : '';
    const focusOnDiv = () => {
        const node = divRef.current;
        node === null || node === void 0 ? void 0 : node.focus();
    };
    const formFieldFactory = new FormFieldFactory(entityService, formik, formik.handleChange, formik.handleBlur, divRef);
    const confirmEditionText = () => {
        if (totalEntitiesUsed) {
            return (_jsxs("span", { children: [_(`You are about to update`), " ", _jsx("strong", { children: iden }), _jsx("br", {}), _(`This change will affect`), " ", _jsx("strong", { children: totalEntitiesUsed }), ' ', _(`entities`)] }));
        }
        return (_jsxs("span", { children: [_(`You are about to update`), " ", _jsx("strong", { children: iden })] }));
    };
    return (_jsxs("div", { children: [_jsxs("form", Object.assign({ onSubmit: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (formik.isSubmitting) {
                        return;
                    }
                    if (editDoubleCheck) {
                        setFormEvent(e);
                        setShowConfirm(true);
                        return;
                    }
                    formik.handleSubmit(e);
                }, style: { display: 'flex', flexDirection: 'column', gap: '40px' } }, { children: [groups.map((group, idx) => {
                        const fields = group.fields;
                        const visible = fields.reduce((acc, fld) => {
                            const fldName = typeof fld === 'string' ? fld : fld.name;
                            return acc || visualToggles[fldName];
                        }, false);
                        if (!visible) {
                            return null;
                        }
                        const visibilityStyles = visible
                            ? { display: 'block' }
                            : { display: 'none' };
                        focusOnDiv();
                        return (_jsxs("div", Object.assign({ ref: divRef, style: Object.assign(Object.assign({}, visibilityStyles), { position: 'relative' }) }, { children: [_jsx(StyledGroupLegend, { children: group.legend }), _jsx(StyledGroupGrid, { children: fields.map((column, idx) => {
                                        const fldName = typeof column === 'string' ? column : column.name;
                                        if (fldName === filterBy) {
                                            return null;
                                        }
                                        return (_jsx(ErrorBoundary, Object.assign({ minimalist: true }, { children: _jsx(FormFieldMemo, { column: column, fkChoices: fkChoices || autoloadedFkChoices, visualToggles: visualToggles, readOnlyProperties: readOnlyProperties, formFieldFactory: formFieldFactory }) }), idx));
                                    }) })] }), idx));
                    }), Object.keys(errorList).length > 0 && (_jsxs(_Fragment, { children: [_jsx("br", {}), _jsxs(Alert, Object.assign({ severity: 'error' }, { children: [_jsx(AlertTitle, { children: _('Validation error') }), _jsx("ul", { children: Object.values(errorList).map((error) => error) })] })), _jsx("br", {})] })), _jsx(SaveButton, {}), reqError && _jsx(ErrorMessage, { message: reqError })] })), _jsx(ConfirmEditionDialog, { text: confirmEditionText(), open: showConfirm, handleClose: () => setShowConfirm(false), formEvent: formEvent, handleSave: (e) => formik.handleSubmit(e) })] }));
};
export { Form };
