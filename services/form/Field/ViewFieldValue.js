import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { isPropertyFk, isPropertyScalar, } from '../../api/ParsedApiSpecInterface';
import { CustomComponentWrapper, } from './CustomComponentWrapper';
import FileUploader from './FileUploader';
import { FormControlLabel, Switch } from '@mui/material';
import { SwitchFormControl } from './SwitchFormControl';
const ViewFieldValue = (props) => {
    const { columnName, values, entityService } = props;
    let { property } = props;
    if (!property) {
        return null;
    }
    const noComponent = !property.component;
    if (noComponent && isPropertyFk(property) && property.type === 'file') {
        const downloadModel = property.$ref.split('/').pop();
        const downloadAction = entityService.getItemByModel(downloadModel !== null && downloadModel !== void 0 ? downloadModel : '');
        const paths = (downloadAction === null || downloadAction === void 0 ? void 0 : downloadAction.paths) || [];
        const downloadPath = paths.length
            ? paths.pop().replace('{id}', values.id)
            : null;
        return (_jsx(FileUploader, { property: property, _columnName: columnName, readOnly: true, disabled: true, values: values, changeHandler: () => {
                return;
            }, onBlur: () => {
                return;
            }, downloadPath: downloadPath, hasChanged: false, choices: null }));
    }
    else if (noComponent) {
        const component = (props) => {
            var _a;
            const { values, property } = props;
            let val = (_a = values[columnName]) !== null && _a !== void 0 ? _a : '';
            if (val === null) {
                val = '';
            }
            else if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            else if (isPropertyScalar(property) && property.enum) {
                const enumValues = property.enum;
                val = enumValues[val];
            }
            else if (isPropertyScalar(property) && property.type === 'boolean') {
                const checked = Array.isArray(val) ? val.includes('1') : Boolean(val);
                return (_jsx(SwitchFormControl, Object.assign({ hasChanged: false }, { children: _jsx(FormControlLabel, { disabled: true, control: _jsx(Switch, { name: columnName, checked: checked, value: true }), label: property.label }) })));
            }
            const prefix = (property === null || property === void 0 ? void 0 : property.prefix) || '';
            return (_jsxs("span", { children: [prefix, val] }));
        };
        property = Object.assign(Object.assign({}, property), { component });
    }
    const PropertyComponent = property
        .component;
    return (_jsx(CustomComponentWrapper, Object.assign({ property: property, hasChanged: false, disabled: true }, { children: _jsx(PropertyComponent, { _context: 'read', _columnName: columnName, property: property, values: values }) })));
};
export default ViewFieldValue;
