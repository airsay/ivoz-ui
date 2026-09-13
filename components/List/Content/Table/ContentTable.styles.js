var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import { Table, TableCell, styled } from '@mui/material';
import { forwardRef } from 'react';
import { LightButton } from '../../../../components/shared/Button/Button.styles';
import HistoryTrackerLink from '../../../../components/shared/HistoryTrackerLink';
import ContentTable from './ContentTable';
const linkSharedStyles = {
    cursor: 'pointer',
};
export const StyledContentTable = styled(ContentTable)(() => {
    return {
        width: '100%',
        '& th': {
            color: 'var(--color-text)',
            fontWeight: 'normal',
            fontSize: '15px',
            whiteSpace: 'nowrap',
        },
        '& tbody': {
            '& tr': {
                borderTop: '1px solid var(--color-border)',
            },
            '& tr:hover': {
                backgroundColor: 'var(--color-primary-tonal)',
            },
            '& td': {
                fontSize: '16px',
            },
        },
        '& .MuiTableCell-root': {
            border: 0,
            padding: '8px',
            paddingInline: 'var(--spacing-md)',
        },
        '& .actions-cell': {
            display: 'flex',
            gap: 'var(--spacing-sm)',
            alignItems: 'center',
            justifyContent: 'flex-end',
        },
    };
});
const TableRowLinkButton = forwardRef((props, ref) => {
    const { children, className, to, disabled } = props, rest = __rest(props, ["children", "className", "to", "disabled"]);
    if (disabled) {
        return _jsx(LightButton, Object.assign({ disabled: disabled }, { children: children }));
    }
    return (_jsx(HistoryTrackerLink, Object.assign({}, rest, { to: to, className: className, ref: ref }, { children: _jsx(LightButton, { children: children }) })));
});
TableRowLinkButton.displayName = 'TableRowLinkButton';
export const StyledTableRowCta = styled(TableRowLinkButton)(() => {
    return Object.assign(Object.assign({}, linkSharedStyles), { textDecoration: 'none' });
});
export const StyledTableRowCustomCta = LightButton;
export const StyledTableRowEntityCta = styled(TableRowLinkButton)(() => {
    return Object.assign(Object.assign({}, linkSharedStyles), { textDecoration: 'none' });
});
export const StyledTableRowChildEntityLink = styled((props) => {
    const { children, className, to } = props, rest = __rest(props, ["children", "className", "to"]);
    return (_jsx(HistoryTrackerLink, Object.assign({}, rest, { to: to, className: className }, { children: children })));
})(() => {
    return Object.assign(Object.assign({}, linkSharedStyles), { textDecoration: 'none', color: 'inherit', width: '100%' });
});
export const StyledTableRowFkLink = styled((props) => {
    const { children, className, to } = props;
    return (_jsx(HistoryTrackerLink, Object.assign({ to: to, className: `link ${className}` }, { children: children })));
})(() => {
    return linkSharedStyles;
});
const _DeleteIcon = forwardRef((props, ref) => {
    const { className, onClick } = props, rest = __rest(props, ["className", "onClick"]);
    return (_jsx(DeleteIcon, Object.assign({}, rest, { className: className, onClick: onClick, ref: ref })));
});
_DeleteIcon.displayName = '_DeleteIcon';
export const StyledDeleteIcon = styled(_DeleteIcon)(() => {
    return linkSharedStyles;
});
export const StyledCheckBoxIcon = styled(CheckBoxIcon)(() => {
    return {
        color: '#aaa',
        verticalAlign: 'bottom',
        fontSize: '1.3em',
    };
});
export const StyledCheckBoxOutlineBlankIcon = styled(CheckBoxOutlineBlankIcon)(() => {
    return {
        color: '#aaa',
        fontSize: '1.3em',
    };
});
export const StyledTable = styled(Table)(() => {
    return {
        tableLayout: 'auto',
    };
});
export const StyledTableCell = styled((props) => {
    const { children, className, key } = props, rest = __rest(props, ["children", "className", "key"]);
    return (_jsx(TableCell, Object.assign({ className: className }, rest, { children: children }), key));
})(() => {
    return {
        overflowWrap: 'break-word',
    };
});
export const StyledActionsTableCell = styled((props) => {
    const { children, className, key } = props;
    return (_jsx(TableCell, Object.assign({ className: className }, { children: children }), key));
})(() => {
    return {
        textAlign: 'right',
        paddingRight: '8px',
    };
});
