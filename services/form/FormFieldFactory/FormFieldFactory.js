import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { InputAdornment, } from '@mui/material';
import React from 'react';
import { isPropertyEmbeddable, isPropertyFk, isPropertyScalar, } from '../../api/ParsedApiSpecInterface';
import { CustomFunctionComponentContext, } from '../../form/Field/CustomComponentWrapper';
import { DynamicAutocompleteFactory, AutocompleteFactory, DateFactory, DateTimeFactory, DropdownFactory, FileUploadFactory, InputTextFactory, MultilangFactory, NumberFactory, PasswordFactory, SwitchFactory, TextareaFactory, TimeFactory, ColorFactory, } from './Factory/index';
import { StoreContainer } from '../../../store';
export default class FormFieldFactory {
    constructor(entityService, formik, changeHandler, handleBlur, divRef) {
        this.entityService = entityService;
        this.formik = formik;
        this.changeHandler = changeHandler;
        this.handleBlur = handleBlur;
        this.divRef = divRef;
    }
    getDynamicSelectOptions(property) {
        var _a;
        if (!isPropertyFk(property)) {
            return undefined;
        }
        const entities = StoreContainer.store.getState().entities.entities;
        const entityName = property.$ref.replace('#/definitions/', '');
        if (!((_a = entities[entityName]) === null || _a === void 0 ? void 0 : _a.dynamicSelectOptions)) {
            return undefined;
        }
        return entities[entityName].selectOptions;
    }
    isDynamicAutocomplete(property) {
        var _a;
        if (!isPropertyFk(property)) {
            return false;
        }
        const entities = StoreContainer.store.getState().entities.entities;
        const cleanRef = property.$ref.replace('#/definitions/', '');
        if (!((_a = entities[cleanRef]) === null || _a === void 0 ? void 0 : _a.dynamicSelectOptions)) {
            return false;
        }
        return true;
    }
    getFormField(fld, choices, readOnly = false) {
        const property = this.getProperty(fld);
        if (!property) {
            console.error(`Property ${fld} was not found`);
            return null;
        }
        return this.createByPropertySpec(fld, property, choices, readOnly);
    }
    createByPropertySpec(fld, property, choices, readOnly = false) {
        return (_jsx(React.Fragment, { children: this.getInputField(fld, property, choices, readOnly) }));
    }
    getProperty(fld) {
        const properties = this.entityService.getProperties();
        return properties[fld];
    }
    getInputField(fld, property, choices, readOnly) {
        const { disabled, multiSelect, fileUpload, value, hasChanged, error, touched, } = this.parseInputFieldProperties(fld, property, readOnly);
        if (property.component) {
            const PropertyComponent = property
                .component;
            return (_jsx(PropertyComponent, { _context: CustomFunctionComponentContext.write, _columnName: fld, readOnly: readOnly, formik: this.formik, values: this.formik.values, choices: choices, property: property, disabled: disabled, changeHandler: this.changeHandler, onBlur: this.handleBlur, formFieldFactory: this }));
        }
        if (this.isDynamicAutocomplete(property)) {
            return (_jsx(DynamicAutocompleteFactory, { fld: fld, property: property, disabled: disabled, multiSelect: multiSelect, value: value, hasChanged: hasChanged, error: error, touched: touched, choices: choices, changeHandler: this.changeHandler, handleBlur: this.handleBlur, entityService: this.entityService }));
        }
        if (isPropertyFk(property) || multiSelect) {
            return (_jsx(AutocompleteFactory, { fld: fld, property: property, disabled: disabled, multiSelect: multiSelect, value: value, hasChanged: hasChanged, error: error, touched: touched, choices: choices, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        if (isPropertyScalar(property) && property.enum) {
            return (_jsx(DropdownFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, choices: choices, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        if (isPropertyScalar(property) && property.type === 'boolean') {
            return (_jsx(SwitchFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, choices: choices, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        if (fileUpload) {
            return (_jsx(FileUploadFactory, { fld: fld, property: property, disabled: disabled, entityService: this.entityService, formik: this.formik, hasChanged: hasChanged, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        const inputProps = {};
        const InputProps = {};
        if (property.prefix) {
            InputProps.startAdornment = (_jsx(InputAdornment, Object.assign({ position: 'start' }, { children: property.prefix })));
        }
        if (property.suffix) {
            InputProps.endAdornment = (_jsx(InputAdornment, Object.assign({ position: 'end' }, { children: property.suffix })));
        }
        if (isPropertyScalar(property) &&
            ['integer', 'number'].includes(property.type || '')) {
            return (_jsx(NumberFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        if (isPropertyScalar(property) && property.type === 'string') {
            if (property.format === 'date-time') {
                return (_jsx(DateTimeFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            if (property.format === 'date') {
                return (_jsx(DateFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            if (property.format === 'time') {
                return (_jsx(TimeFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            if (property.maxLength) {
                inputProps.maxLength = property.maxLength;
            }
            if (property.format === 'textarea') {
                return (_jsx(TextareaFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            if (property.format === 'password') {
                return (_jsx(PasswordFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            if (property.format === 'color') {
                return (_jsx(ColorFactory, { fld: fld, parentRef: this.divRef, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
            }
            return (_jsx(InputTextFactory, { fld: fld, property: property, disabled: disabled, value: value, hasChanged: hasChanged, error: error, touched: touched, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        if (isPropertyEmbeddable(property) && property.multilang === true) {
            const properties = this.entityService.getAllProperties();
            return (_jsx(MultilangFactory, { fld: fld, properties: properties, property: property, disabled: disabled, formik: this.formik, hasChanged: hasChanged, inputProps: inputProps, InputProps: InputProps, changeHandler: this.changeHandler, handleBlur: this.handleBlur }));
        }
        console.log('UNKNOWN FIELD TYPE', property);
        return _jsxs("span", { children: ["UNKNOWN FIELD TYPE ", property.type] });
    }
    parseInputFieldProperties(fld, property, readOnly) {
        const disabled = property.readOnly || readOnly;
        const multiSelect = property.type === 'array';
        const fileUpload = isPropertyEmbeddable(property) && property.type === 'file';
        const valuePath = fld.split('.');
        const value = valuePath.length > 1
            ? this.formik.values[valuePath[0]][valuePath[1]]
            : this.formik.values[fld];
        const initialValue = valuePath.length > 1
            ? this.formik.values[valuePath[0]][valuePath[1]]
            : this.formik.initialValues[fld];
        const hasChanged = initialValue != value;
        const formikError = this.formik.errors;
        const error = valuePath.length > 1 && formikError[valuePath[0]]
            ? formikError[valuePath[0]][valuePath[1]]
            : formikError[fld];
        const formikTouched = this.formik.touched;
        const touched = valuePath.length > 1 && formikTouched[valuePath[0]]
            ? formikTouched[valuePath[0]][valuePath[1]]
            : formikTouched[fld];
        return {
            disabled,
            multiSelect,
            fileUpload,
            value,
            hasChanged,
            error,
            touched,
        };
    }
}
