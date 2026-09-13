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
import { Fab, styled } from '@mui/material';
import { forwardRef } from 'react';
import HistoryTrackerLink from '../../../components/shared/HistoryTrackerLink';
import ListContent from './ListContent';
export const ListContentStyler = ({ theme }) => {
    return {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing-md)',
        '& .list-content-header': {
            display: 'flex',
            gap: 'var(--spacing-sm)',
            justifyContent: 'space-between',
        },
        '& .buttons': {
            display: 'flex',
            gap: 'var(--spacing-sm)',
            alignItems: 'center',
            '&.start': {
                flexShrink: 1,
                minWidth: 0,
            },
            '&.end': {
                flexShrink: 0,
            },
        },
        '.text-field': {
            width: 'unset',
        },
        '& .input-field': {
            background: 'var(--color-background)',
            color: 'var(--color-text)',
            [theme.breakpoints.down('md')]: {
                background: 'var(--color-background-elevated)',
            },
        },
        '.filter-chips': {
            display: 'flex',
            gap: 'var(--spacing-sm)',
            flexShrink: '1',
            overflow: 'auto',
            paddingBottom: '2px',
            '&::-webkit-scrollbar': {
                height: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '6px',
                background: 'var(--color-button)',
            },
            '&::-webkit-scrollbar-thumb:hover': {
                background: 'var(--color-border)',
            },
        },
        '& .card': {
            paddingBottom: 0,
            [theme.breakpoints.down('md')]: {
                paddingBlock: 0,
            },
        },
    };
};
export const StyledListContent = styled(ListContent)(ListContentStyler);
export const StyledActionButtonContainer = styled('div')(() => {
    return {
        display: 'flex',
        justifyContent: 'space-between',
        '& > .buttons': {
            textAlign: 'end',
            '& button': {
                height: '40px',
                minWidth: '40px',
            },
        },
    };
});
export const StyledLink = styled((props) => {
    const { children, className, to } = props;
    return (_jsx(HistoryTrackerLink, Object.assign({ to: to, className: className }, { children: children })));
})(() => {
    return {
        textDecoration: 'none',
        color: 'inherit',
    };
});
const _Fab = forwardRef((props, ref) => {
    const { children, className, onClick } = props, rest = __rest(props, ["children", "className", "onClick"]);
    return (_jsx(Fab, Object.assign({}, rest, { color: 'secondary', size: 'small', variant: 'extended', className: className, onClick: onClick, ref: ref }, { children: children })));
});
_Fab.displayName = '_Fab';
export const StyledFab = styled(_Fab)(() => {
    return {
        marginRight: '10px',
    };
});
