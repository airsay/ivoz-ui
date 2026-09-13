var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { isPropertyEmbeddable, isPropertyScalar, } from '../../services/api/ParsedApiSpecInterface';
import { CustomFunctionComponentContext } from '../../services/form/Field/CustomComponentWrapper';
import ListDecoratorMultilang from './ListDecoratorMultilang';
import { ImageFileUploader } from '../../services/form/Field/FileUploader/Variant/ImageFileUploader';
const ListDecorator = (props) => {
    var _a;
    const { field, row, property, ignoreCustomComponent, entityPath } = props;
    const valuePath = field.split('.');
    let value = valuePath.length > 1
        ? row[valuePath.shift()][valuePath.shift()]
        : row[field];
    if (property.component && !ignoreCustomComponent) {
        return (_jsx(property.component, { _columnName: field, _context: CustomFunctionComponentContext.read, values: row, property: property, disabled: false, changeHandler: () => {
                return null;
            }, onBlur: () => {
                return null;
            } }));
    }
    if (isPropertyEmbeddable(property) && property.multilang === true) {
        return (_jsx(ListDecoratorMultilang, { field: field, row: row, property: property }));
    }
    if (property.type === 'file') {
        const isImage = (_a = value === null || value === void 0 ? void 0 : value.mimeType) === null || _a === void 0 ? void 0 : _a.includes('image/');
        if (isImage && entityPath) {
            return (_jsx(ImageFileUploader, { _columnName: field, _context: CustomFunctionComponentContext.read, values: row, property: property, disabled: false, readOnly: true, downloadPath: `${entityPath}/${row.id}/${field}`, handleDownload: () => __awaiter(void 0, void 0, void 0, function* () { return Promise.resolve(); }), changeHandler: () => null, onBlur: () => null, choices: null, hasChanged: false }));
        }
        return value === null || value === void 0 ? void 0 : value.baseName;
    }
    if (isPropertyScalar(property) && property.enum) {
        let idx = value;
        if (typeof value == 'boolean') {
            idx = value ? 1 : 0;
        }
        if (property.enum[idx]) {
            value = property.enum[idx];
        }
    }
    if (isPropertyScalar(property) && property.format === 'date') {
        return (value === null || value === void 0 ? void 0 : value.substring(0, 10)) || '';
    }
    if (isPropertyScalar(property) && property.format === 'date-time') {
        const localStringOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
        return value
            ? new Date(value).toLocaleString(navigator.language, localStringOptions)
            : '';
    }
    if (!value && property.null) {
        value = property.null;
    }
    return value !== null && value !== undefined ? value : '';
};
export default ListDecorator;
