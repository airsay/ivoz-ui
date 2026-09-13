var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStoreState } from 'store';
import FormFieldFactory from '../../services/form/FormFieldFactory';
import { StyledGroupGrid, StyledGroupLegend, } from '../DefaultEntityBehavior.styles';
import useFkChoices from '../data/useFkChoices';
import filterFieldsetGroups from './FilterFieldsetGroups';
import { useFormHandler } from './Form/useFormHandler';
const View = (props) => {
    const { entityService, row, unmarshaller, properties, fkChoices, match, foreignKeyGetter: foreignKeyGetterLoader, } = props;
    const [foreignKeyGetter, setForeignKeyGetter] = useState();
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getColumns(storeState);
    const columnNames = Object.keys(columns);
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
    const formik = useFormHandler(Object.assign(Object.assign({}, props), { initialValues: unmarshaller(row, properties), validator: () => {
            return {};
        }, onSubmit: () => __awaiter(void 0, void 0, void 0, function* () {
            /* noop */
        }) }));
    const formFieldFactory = new FormFieldFactory(entityService, formik, formik.handleChange, formik.handleBlur);
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
    const fks = fkChoices || autoloadedFkChoices;
    return (_jsx(React.Fragment, { children: groups.map((group, idx) => {
            const fields = group.fields;
            return (_jsxs("div", { children: [_jsx(StyledGroupLegend, { children: group.legend }), _jsx(StyledGroupGrid, { children: fields.map((column, idx) => {
                            var _a;
                            const fldName = typeof column === 'string' ? column : column.name;
                            const choices = (_a = fks[fldName]) !== null && _a !== void 0 ? _a : null;
                            return (_jsx(Grid, Object.assign({ item: true, xs: 12, md: 6, lg: 4 }, { children: formFieldFactory.getFormField(fldName, choices, true) }), idx));
                        }) })] }, idx));
        }) }));
};
export default View;
