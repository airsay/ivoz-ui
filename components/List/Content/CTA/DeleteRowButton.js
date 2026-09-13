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
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import ConfirmDialog from '../../../../components/shared/ConfirmDialog';
import _ from '../../../../services/translations/translate';
import { useStoreActions } from '../../../../store';
import { StyledDeleteIcon } from '../Table/ContentTable.styles';
import { LightButton } from '../../../../components/shared/Button/Button.styles';
import { MoreMenuItem } from '../Shared/MoreChildEntityLinks';
const DeleteRowButton = (props) => {
    const { row, entityService, disabled = false, variant = 'icon' } = props;
    const [showDelete, setShowDelete] = useState(false);
    const handleHideDelete = () => {
        setShowDelete(false);
    };
    const reloadPage = useStoreActions((actions) => {
        return actions.list.reload;
    });
    const apiDelete = useStoreActions((actions) => {
        return actions.api.delete;
    });
    const handleDelete = (event) => __awaiter(void 0, void 0, void 0, function* () {
        const path = entityService.getDeletePath();
        if (!path) {
            throw new Error('Unknown delete path');
        }
        event.preventDefault();
        try {
            const resp = yield apiDelete({
                path: path.replace('{id}', row.id),
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
    const entity = entityService.getEntity();
    const iden = entity.toStr(row);
    const isIdenInt = Number.isInteger(parseInt(iden, 10));
    const printStrongIden = () => {
        if (!isIdenInt) {
            return _jsx("strong", { children: iden });
        }
        return _jsx(_Fragment, {});
    };
    return (_jsxs(_Fragment, { children: [variant === 'icon' && (_jsx(Tooltip, Object.assign({ title: _('Delete'), placement: 'bottom', enterTouchDelay: 0, arrow: true }, { children: _jsx("span", { children: _jsx(LightButton, Object.assign({ disabled: disabled, onClick: () => !disabled && setShowDelete(true) }, { children: _jsx(StyledDeleteIcon, {}) })) }) }))), variant === 'text' && (_jsx(MoreMenuItem, Object.assign({ className: disabled ? 'disabled' : '', onClick: () => !disabled && setShowDelete(true) }, { children: _('Delete') }))), _jsx(ConfirmDialog, { text: _jsxs("span", { children: [_('You are about to remove'), " ", printStrongIden()] }), open: showDelete, doubleCheck: entity.deleteDoubleCheck || false, doubleCheckExpectedStr: iden, handleClose: handleHideDelete, handleApply: handleDelete })] }));
};
export default DeleteRowButton;
