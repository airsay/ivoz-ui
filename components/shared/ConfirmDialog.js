import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useState } from 'react';
import { StyledSearchTextField } from '../../services/form/Field/TextField/TextField.styles';
import _ from '../../services/translations/translate';
import { StyledDialogContentText } from './ConfirmDialog.styles';
import Modal from './Modal/Modal';
export default function ConfirmDialog(props) {
    const { text, open, doubleCheck, doubleCheckExpectedStr, handleClose, handleApply, } = props;
    const [inputVal, setInputVal] = useState('');
    const onChangeHandler = useCallback((event) => {
        const val = event.target.value;
        setInputVal(val || '');
    }, []);
    const submitEnabled = !doubleCheck || inputVal == doubleCheckExpectedStr;
    const customButtons = [
        {
            label: _('No, keep it'),
            onClick: () => handleClose(),
            variant: 'outlined',
            autoFocus: false,
        },
        {
            label: _('Yes, delete it'),
            onClick: (event) => handleApply(event),
            variant: 'solid',
            autoFocus: true,
            disabled: !submitEnabled,
        },
    ];
    return (_jsx(Modal, Object.assign({ title: _('Remove element'), description: text, open: open, onClose: handleClose, buttons: customButtons, icon: 'assets/img/delete-dialog.svg', keepMounted: true }, { children: doubleCheck && (_jsxs(_Fragment, { children: [_jsx(StyledDialogContentText, Object.assign({ id: 'alert-dialog-double-check-description' }, { children: _('Please type the item name, as shown in bold font above, to continue') })), _jsx(StyledSearchTextField, { type: 'text', hasChanged: false, defaultValue: inputVal, onChange: onChangeHandler })] })) })));
}
