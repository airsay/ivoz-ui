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
import { saveAs } from 'file-saver';
import { parseContentDispositionFilename } from '../../../../helpers';
import { useCallback, useState, } from 'react';
import { useStoreActions } from '../../../../store';
import { StyledFieldsetRoot } from '../CustomComponentWrapper.styles';
import { AudioFileUploader } from './Variant/AudioFileUploader';
import { ImageFileUploader } from './Variant/ImageFileUploader';
import RegularFileUploader from './Variant/RegularFileUploader';
const FileUploader = (props) => {
    const { property, hasChanged, disabled, _columnName, accept, values, downloadPath, changeHandler, } = props;
    let { className } = props;
    const fileValue = values[_columnName];
    const { mimeType } = fileValue;
    if (!downloadPath) {
        console.error('Empty download path');
        return null;
    }
    const apiDownload = useStoreActions((actions) => {
        return actions.api.download;
    });
    const [downloading, setDownloading] = useState(false);
    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);
    const handleDownload = useCallback((e) => __awaiter(void 0, void 0, void 0, function* () {
        if (downloading) {
            return;
        }
        setDownloading(true);
        e.preventDefault();
        e.stopPropagation();
        try {
            yield apiDownload({
                path: downloadPath,
                params: {},
                successCallback: (data, headers) => __awaiter(void 0, void 0, void 0, function* () {
                    const fileName = parseContentDispositionFilename(headers['content-disposition'] || '');
                    saveAs(data, fileName);
                }),
            });
        }
        finally {
            setDownloading(false);
        }
    }), [downloading, downloadPath, apiDownload]);
    const onChange = useCallback((event) => {
        const files = event.target.files || [];
        if (!files.length) {
            return;
        }
        const value = Object.assign(Object.assign({}, fileValue), { file: files[0] });
        const changeEvent = {
            target: {
                name: _columnName,
                value: value,
            },
        };
        changeHandler(changeEvent);
    }, [changeHandler, _columnName, fileValue]);
    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        const event = {
            target: {
                files: e.dataTransfer.files,
            },
        };
        onChange(event);
    }, [onChange]);
    const [dragLevel, setDragLevel] = useState(0);
    if (dragLevel > 0) {
        className = className ? `${className} dragging` : 'dragging';
    }
    const audio = (mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('audio/')) || (accept === null || accept === void 0 ? void 0 : accept.includes('audio/'));
    const image = (mimeType === null || mimeType === void 0 ? void 0 : mimeType.includes('image/')) || (accept === null || accept === void 0 ? void 0 : accept.includes('image/'));
    const regular = !audio && !image;
    return (_jsxs(StyledFieldsetRoot, Object.assign({ className: className, label: property.label, hasChanged: hasChanged, disabled: disabled, handleDrop: (event) => {
            setDragLevel(0);
            handleDrop(event);
        }, handleDragEnter: (event) => {
            setDragLevel((state) => state + 1);
            handleDragEnter(event);
        }, handleDragLeave: (event) => {
            setDragLevel((state) => state - 1);
            handleDragLeave(event);
        }, handleDragOver: handleDragOver }, { children: [regular && (_jsx(RegularFileUploader, Object.assign({}, props, { downloadPath: downloadPath, handleDownload: handleDownload }))), image && (_jsx(ImageFileUploader, Object.assign({}, props, { downloadPath: downloadPath, handleDownload: handleDownload }))), audio && (_jsx(AudioFileUploader, Object.assign({}, props, { downloadPath: downloadPath, handleDownload: handleDownload })))] })));
};
export default FileUploader;
