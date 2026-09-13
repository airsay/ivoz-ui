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
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import UploadFileRoundedIcon from '@mui/icons-material/UploadFileRounded';
import { useEffect, useState } from 'react';
import { useStoreActions } from 'store';
import { StyledFileNameContainer, StyledFileUploaderContainer, StyledUploadButtonLabel, } from '../FileUploader.styles';
import { Box } from '@mui/material';
import AudioPlayer from './AudioPlayer';
export const AudioFileUploader = (props) => {
    var _a, _b;
    const { _columnName, accept, values, disabled, downloadPath, handleDownload, changeHandler, onBlur, } = props;
    const [audioSrc, setAudioSrc] = useState(undefined);
    const downloadAction = useStoreActions((actions) => actions.api.download);
    useEffect(() => {
        if (audioSrc) {
            return;
        }
        downloadAction({
            path: downloadPath,
            params: {},
            handleErrors: false,
            successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                const objectUrl = URL.createObjectURL(data);
                setAudioSrc(objectUrl);
            }),
        }).catch((error) => {
            console.error(error);
        });
    }, []);
    if (!audioSrc) {
        return null;
    }
    const fileValue = values[_columnName];
    const id = `${_columnName}-file-upload`;
    const fileName = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_a = fileValue.file) === null || _a === void 0 ? void 0 : _a.name : fileValue === null || fileValue === void 0 ? void 0 : fileValue.baseName;
    const fileSize = (fileValue === null || fileValue === void 0 ? void 0 : fileValue.file) ? (_b = fileValue.file) === null || _b === void 0 ? void 0 : _b.size : fileValue === null || fileValue === void 0 ? void 0 : fileValue.fileSize;
    const fileSizeMb = Math.round(((fileSize || 0) / 1024 / 1024) * 10) / 10;
    return (_jsxs(StyledFileUploaderContainer, { children: [_jsxs("div", { children: [_jsx("input", { style: { display: 'none' }, id: id, type: 'file', accept: accept, onChange: (event) => {
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
                        } }), _jsxs(Box, Object.assign({ sx: {
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: 'var(--spacing-sm)',
                        } }, { children: [fileName && (_jsxs(StyledFileNameContainer, Object.assign({ className: disabled ? 'disabled' : '' }, { children: [values.id && _jsx(DownloadRoundedIcon, { onClick: handleDownload }), fileName, " (", fileSizeMb, "MB)"] }))), !disabled && (_jsx(StyledUploadButtonLabel, Object.assign({ htmlFor: id, className: 'upload-icon' }, { children: _jsx(UploadFileRoundedIcon, {}) })))] })), _jsx(AudioPlayer, { src: audioSrc })] }), _jsx("div", Object.assign({ className: 'uploader-backdrop' }, { children: "Audio" }))] }));
};
