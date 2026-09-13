import { jsx as _jsx } from "react/jsx-runtime";
import FileUploader from '../../../form/Field/FileUploader';
export const FileUploadFactory = (props) => {
    const { fld, disabled, hasChanged, property, changeHandler, handleBlur, entityService, formik, } = props;
    const downloadModel = property.$ref.split('/').pop();
    const downloadAction = entityService.getItemByModel(downloadModel !== null && downloadModel !== void 0 ? downloadModel : '');
    const paths = (downloadAction === null || downloadAction === void 0 ? void 0 : downloadAction.paths) || [];
    const downloadPath = paths.length
        ? paths.pop().replace('{id}', formik.values.id)
        : null;
    const accept = property.accept;
    return (_jsx(FileUploader, { property: property, accept: accept, _columnName: fld, readOnly: disabled, disabled: disabled, formik: formik, values: formik.values, changeHandler: changeHandler, onBlur: handleBlur, downloadPath: downloadPath, hasChanged: hasChanged, choices: null }));
};
