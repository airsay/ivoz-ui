import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu, useMediaQuery, useTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useStoreActions, useStoreState } from '../../../store';
import { StyledContentFilterSelector } from './ContentFilterSelector/ContentFilterSelector.styles';
import { FilterCriteria } from './FilterCriteria';
export function ContentFilterDialog(props) {
    const { entityService, path, preloadData, ignoreColumn, cancelToken, match, anchorEl, setAnchorEl, } = props;
    const queryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    const foreignEntities = useStoreState((state) => state.list.fkChoices);
    const setQueryStringCriteria = useStoreActions((actions) => {
        return actions.route.setQueryStringCriteria;
    });
    const setFkChoices = useStoreActions((actions) => {
        return actions.list.setFkChoices;
    });
    const mobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [loading, setLoading] = useState(true);
    const foreignKeyGetterLoader = entityService.getEntity().foreignKeyGetter;
    useEffect(() => {
        if (!loading) {
            return;
        }
        if (!preloadData && !Boolean(anchorEl)) {
            return;
        }
        foreignKeyGetterLoader().then((foreignKeyGetter) => {
            foreignKeyGetter({
                entityService,
                cancelToken,
                match,
                filterContext: true,
            }).then((foreignEntities) => {
                setFkChoices(foreignEntities);
                setLoading(false);
            });
        });
    }, [
        preloadData,
        anchorEl,
        loading,
        foreignKeyGetterLoader,
        entityService,
        cancelToken,
        match,
    ]);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const commitCriteria = (data) => {
        handleClose();
        const sanitizeData = data.map((row) => {
            return Object.assign(Object.assign({}, row), { value: encodeURIComponent(row.value) });
        });
        setQueryStringCriteria(sanitizeData);
    };
    const removeFilter = (index) => {
        const newCriteria = [...queryStringCriteria];
        newCriteria.splice(index, 1);
        setQueryStringCriteria(newCriteria);
    };
    return (_jsxs(_Fragment, { children: [_jsx(Menu, Object.assign({ anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'center',
                }, anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleClose }, { children: _jsx(StyledContentFilterSelector, { entityService: entityService, fkChoices: foreignEntities, ignoreColumn: ignoreColumn, path: path, commitCriteria: commitCriteria, close: handleClose }) })), !mobile && (_jsx(FilterCriteria, { entityService: entityService, fkChoices: foreignEntities, removeFilter: removeFilter, path: path }))] }));
}
