var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import _ from '../../../../services/translations/translate';
import { useStoreActions } from '../../../../store';
import ConfirmDialog from '../../../shared/ConfirmDialog';
import { LightButton } from '../../../../components/shared/Button/Button.styles';
import { MoreMenuItem } from '../Shared/MoreChildEntityLinks';
const DeleteRowsButton = (props) => {
    const { entityService, selectedValues, variant = 'icon' } = props;
    const disabled = selectedValues.length === 0;
    const [showDelete, setShowDelete] = useState(false);
    const handleShowDelete = () => {
        if (disabled) {
            return;
        }
        setShowDelete(true);
    };
    const handleHideDelete = () => {
        setShowDelete(false);
    };
    const reloadPage = useStoreActions((actions) => {
        return actions.list.reload;
    });
    const apiDelete = useStoreActions((actions) => {
        return actions.api.delete;
    });
    const selectedValuesCopy = [...selectedValues];
    let selectedValuesIds = selectedValuesCopy.pop();
    if (selectedValues.length > 1) {
        selectedValuesIds += `?_rmAlso[]=${selectedValuesCopy.join('&_rmAlso[]=')}`;
    }
    const handleDelete = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const path = entityService.getDeletePath();
        if (!path) {
            throw new Error('Unknown delete path');
        }
        event.preventDefault();
        try {
            const resp = yield apiDelete({
                path: path.replace('{id}', selectedValuesIds),
            });
            if (resp !== undefined) {
                setShowDelete(false);
                reloadPage();
            }
        }
        catch (error) {
            setShowDelete(false);
        }
    });
    return (_jsxs(_Fragment, { children: [variant === 'text' && (_jsx(MoreMenuItem, Object.assign({ className: disabled ? 'disabled' : '', onClick: handleShowDelete }, { children: _('Delete') }))), variant === 'icon' && (_jsx(Tooltip, Object.assign({ title: _('Delete'), placement: 'bottom', enterTouchDelay: 0, arrow: true }, { children: _jsx("span", { children: _jsx(LightButton, Object.assign({ onClick: handleShowDelete, disabled: selectedValues.length < 1 }, { children: _jsx(DeleteIcon, {}) })) }) }))), _jsx(ConfirmDialog, { text: `${selectedValues.length} elements will be removed. Are you sure?`, open: showDelete, handleClose: handleHideDelete, handleApply: handleDelete })] }));
};
export default DeleteRowsButton;
