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
import { useStoreActions } from 'store';
import { saveAs } from 'file-saver';
import { parseContentDispositionFilename } from '../../helpers';
import { Tooltip } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { StyledPdfButton } from './DownloadFile.styles';
export default function DownloadFile(props) {
    const { row, path, fileType } = props;
    const apiDownload = useStoreActions((actions) => {
        return actions.api.download;
    });
    const download = () => {
        apiDownload({
            path: `${path}/${row.id}/${fileType}`,
            params: {},
            successCallback: (data, headers) => __awaiter(this, void 0, void 0, function* () {
                const fileName = parseContentDispositionFilename(headers['content-disposition'] || '');
                saveAs(data, fileName);
            }),
        });
    };
    const noFile = !row[fileType].baseName;
    return (_jsx(Tooltip, Object.assign({ title: row[fileType].baseName, placement: 'bottom', arrow: true }, { children: _jsx(StyledPdfButton, Object.assign({ disabled: noFile, onClick: download }, { children: _jsx(DownloadIcon, {}) })) })));
}
