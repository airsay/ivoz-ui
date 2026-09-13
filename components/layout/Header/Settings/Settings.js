import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Paper, Popover, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { StyledDropdown } from '../../../../services/form/Field/Dropdown/Dropdown.styles';
import { useStoreState } from '../../../../store';
import { LightButton } from '../../../shared/Button/Button.styles';
import _ from '../../../../services/translations/translate';
export default function Settings(props) {
    const { children } = props;
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate();
    const { i18n } = useTranslation();
    const languages = useStoreState((state) => state.i18n.languages);
    const choices = languages.map((lang) => {
        return {
            label: lang.name,
            id: lang.locale,
        };
    });
    if (!choices.length) {
        return null;
    }
    return (_jsxs(_Fragment, { children: [_jsx(Tooltip, Object.assign({ title: _('settings') }, { children: _jsx("div", Object.assign({ onClick: handleOpenUserMenu }, { children: _jsx(LightButton, { children: _jsx(SettingsOutlinedIcon, {}) }) })) })), _jsx(Popover, Object.assign({ anchorEl: anchorElUser, open: Boolean(anchorElUser), onClose: handleCloseUserMenu, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right',
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right',
                } }, { children: children || (_jsx(Paper, Object.assign({ sx: { padding: '10px', minWidth: '300px' } }, { children: _jsx(StyledDropdown, { name: 'language', label: _('Language'), value: i18n.language, required: false, disabled: false, onChange: (event) => {
                            const val = event.target.value;
                            i18n.changeLanguage(val);
                            navigate(0);
                        }, onBlur: () => {
                            /* noop */
                        }, choices: choices, error: false, errorMsg: '', helperText: '', hasChanged: false }) }))) }))] }));
}
