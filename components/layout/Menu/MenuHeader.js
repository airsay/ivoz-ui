import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useStoreActions, useStoreState } from 'store';
import { LightButton } from '../../../components/shared/Button/Button.styles';
import { useMediaQuery, useTheme } from '@mui/material';
import Avatar from '../Header/Avatar';
export default function MenuHeader() {
    const desktop = useMediaQuery(useTheme().breakpoints.up('md'));
    const toggleMenuVariant = useStoreActions((actions) => actions.menu.toggleVariant);
    const logo = useStoreState((state) => state.theme.logo);
    const onClickHandler = () => {
        toggleMenuVariant();
    };
    return (_jsxs("div", Object.assign({ className: 'menu-header' }, { children: [_jsx("img", { src: logo || './logo.svg' }), desktop && (_jsx(LightButton, Object.assign({ onClick: onClickHandler }, { children: _jsx(DehazeIcon, {}) }))), !desktop && _jsx(Avatar, {})] })));
}
