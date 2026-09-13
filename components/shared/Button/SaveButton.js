import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { styled } from '@mui/material';
import _ from '../../../services/translations/translate';
import { OutlinedButton, SolidButton } from './Button.styles';
import { Link } from 'react-router-dom';
const SaveButton = function (props) {
    const { className } = props;
    const parentUrl = location.pathname.replace(/\/[^\/]+\/update|\/create/, '');
    const showCancelButton = parentUrl !== location.pathname;
    return (_jsxs("div", Object.assign({ className: className }, { children: [showCancelButton && (_jsx(Link, Object.assign({ to: parentUrl }, { children: _jsx(OutlinedButton, { children: _('Cancel') }) }))), _jsx(SolidButton, Object.assign({ type: 'submit' }, { children: _('Save') }))] })));
};
export default styled(SaveButton)(() => {
    return {
        display: 'flex',
        justifyContent: 'flex-end',
        gap: '20px',
        '& button': {
            width: '160px',
        },
    };
});
