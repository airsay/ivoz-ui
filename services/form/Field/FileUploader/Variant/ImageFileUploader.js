var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from 'react';
import _ from '../../../../translations/translate';
import { StyledFileUploaderContainer, StyledImageContainer, StyledImagePreview, StyledTextContainer, StyledUploadButtonLabel, } from '../FileUploader.styles';
import { useStoreActions } from '../../../../../store';
import { StyledImageFileUpladerTextDield } from '../../TextField/TextField.styles';
import { IconButton, InputAdornment } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { CustomFunctionComponentContext } from '../../CustomComponentWrapper';
export const ImageFileUploader = (props) => {
    var _a, _b;
    const { _columnName, _context, accept, values, disabled, handleDownload, changeHandler, onBlur, downloadPath, property, } = props;
    const fileValue = values[_columnName];
    const id = `${_columnName}-file-upload`;
    const fileName = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_a = fileValue.file) === null || _a === void 0 ? void 0 : _a.name : fileValue === null || fileValue === void 0 ? void 0 : fileValue.baseName;
    const fileSize = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_b = fileValue.file) === null || _b === void 0 ? void 0 : _b.size : fileValue === null || fileValue === void 0 ? void 0 : fileValue.fileSize;
    const fileSizeMb = Math.round(((fileSize || 0) / 1024 / 1024) * 10) / 10;
    const isReadMode = _context === CustomFunctionComponentContext.read;
    const apiDownload = useStoreActions((actions) => {
        return actions.api.download;
    });
    const [imageSrc, setImageSrc] = useState(null);
    useEffect(() => {
        setImageSrc(null);
        if (fileValue.file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(fileValue.file);
            return;
        }
        if (!fileValue.baseName || !fileValue) {
            return;
        }
        apiDownload({
            path: downloadPath,
            params: {},
            successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                setImageSrc(URL.createObjectURL(data));
            }),
        });
    }, [fileValue.file, fileValue.baseName]);
    if (isReadMode) {
        if (!fileName || !imageSrc) {
            return null;
        }
        return (_jsx(StyledImageContainer, { children: _jsx(StyledImagePreview, { src: imageSrc, "$isReadMode": isReadMode }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsxs(StyledFileUploaderContainer, { children: [_jsx("input", { style: { display: 'none' }, id: id, type: 'file', accept: accept, onChange: (event) => {
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
                        } }), fileName && (_jsx(StyledImageContainer, Object.assign({ className: disabled ? 'disabled' : '' }, { children: imageSrc ? (_jsx(StyledImagePreview, { src: imageSrc, onClick: handleDownload, "$isReadMode": isReadMode })) : (values.id && _jsx(AccountCircleIcon, { onClick: handleDownload })) }))), _jsxs(StyledTextContainer, { children: [_jsx("span", { children: "JPG, JPEG, PNG format" }), _jsx("span", { children: "Maximum 500KB" }), !disabled && (_jsx(StyledUploadButtonLabel, Object.assign({ htmlFor: id }, { children: _('Upload image') }))), fileName && (_jsxs("span", { children: [fileName, " (", fileSizeMb, "MB)"] })), fileName && !property.required && (_jsx(StyledImageFileUpladerTextDield, { type: 'text', multiline: false, value: fileName, hasChanged: false, disabled: true, InputProps: {
                                    endAdornment: (_jsx(InputAdornment, Object.assign({ position: 'end' }, { children: _jsx(IconButton, Object.assign({ "aria-label": 'delete image', onClick: () => {
                                                setImageSrc(null);
                                                const changeEvent = {
                                                    target: {
                                                        name: _columnName,
                                                        value: {
                                                            baseName: null,
                                                            file: null,
                                                            fileSize: null,
                                                            mimeType: null,
                                                        },
                                                    },
                                                };
                                                changeHandler(changeEvent);
                                            } }, { children: _jsx(CancelIcon, {}) })) }))),
                                } }))] })] }), _jsx("div", Object.assign({ className: 'uploader-backdrop' }, { children: "Image" }))] }));
};
