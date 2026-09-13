import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import BackupIcon from '@mui/icons-material/Backup';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import { Button } from '@mui/material';
import { StyledFileNameContainer, StyledFileUploaderContainer, StyledUploadButtonLabel, } from '../FileUploader.styles';
const RegularFileUploader = (props) => {
    var _a, _b;
    const { _columnName, accept, values, disabled, handleDownload, changeHandler, onBlur, } = props;
    const fileValue = values[_columnName];
    const id = `${_columnName}-file-upload`;
    const fileName = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_a = fileValue.file) === null || _a === void 0 ? void 0 : _a.name : fileValue === null || fileValue === void 0 ? void 0 : fileValue.baseName;
    const fileSize = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_b = fileValue.file) === null || _b === void 0 ? void 0 : _b.size : fileValue === null || fileValue === void 0 ? void 0 : fileValue.fileSize;
    const fileSizeMb = Math.round(((fileSize || 0) / 1024 / 1024) * 10) / 10;
    return (_jsx(_Fragment, { children: _jsxs(StyledFileUploaderContainer, { children: [_jsx("input", { style: { display: 'none' }, id: id, type: 'file', accept: accept, onChange: (event) => {
                        const files = event.target.files || [];
                        const value = Object.assign(Object.assign({}, fileValue), { file: files[0] });
                        const changeEvent = {
                            target: {
                                name: _columnName,
                                value: value,
                            },
                        };
                        changeHandler(changeEvent);
                        onBlur(changeEvent);
                    } }), !disabled && (_jsx(StyledUploadButtonLabel, Object.assign({ htmlFor: id }, { children: _jsx(Button, Object.assign({ variant: 'contained', component: 'span' }, { children: _jsx(BackupIcon, {}) })) }))), fileName && (_jsxs(StyledFileNameContainer, Object.assign({ className: disabled ? 'disabled' : '' }, { children: [values.id && _jsx(DownloadRoundedIcon, { onClick: handleDownload }), fileName, " (", fileSizeMb, "MB)"] })))] }) }));
};
export default RegularFileUploader;
