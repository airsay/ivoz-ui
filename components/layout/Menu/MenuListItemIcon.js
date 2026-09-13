import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
export const MenuListItemIcon = React.forwardRef((props, ref) => {
    const { icon } = props;
    return (_jsx("span", Object.assign({}, props, { ref: ref }, { children: icon })));
});
MenuListItemIcon.displayName = 'MenuListItemIcon';
