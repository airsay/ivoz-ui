var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Box } from '@mui/system';
import { createRef, forwardRef, useEffect } from 'react';
import { useStoreActions, useStoreState } from 'store';
import _ from '../../../services/translations/translate';
import Pagination from '../Pagination';
import ContentCard from './Card/ContentCard';
import ListContentHeader from './ListContentHeader';
import { StyledContentTable } from './Table/ContentTable.styles';
import useMultiselectState from './Table/hook/useMultiselectState';
import { StyledEmpty } from './Empty.styles';
const ListContent = (props, ref) => {
    const { childEntities, path, entityService, ignoreColumn, preloadData, cancelToken, match, routeChain, location, className, empty, } = props;
    const listRef = createRef();
    const mobile = useMediaQuery(useTheme().breakpoints.down('md'));
    const [selectedValues, handleChange, setSelectedValues] = useMultiselectState();
    const rows = useStoreState((state) => state.list.rows);
    const selectAllHandler = () => {
        const rowIds = rows.map((row) => { var _a; return ((_a = row.id) === null || _a === void 0 ? void 0 : _a.toString()) || ''; });
        setSelectedValues(rowIds);
    };
    const parentRow = useStoreState((state) => state.list.parentRow);
    const setParentRow = useStoreActions((state) => state.list.setParentRow);
    const apiGet = useStoreActions((actions) => {
        return actions.api.get;
    });
    useEffect(() => {
        if (!parentRow) {
            if (Object.values(match.params).length === 0) {
                return;
            }
            const parentRoute = routeChain[routeChain.length - 2];
            if (!parentRoute) {
                return;
            }
            const matchValues = Object.values(match.params);
            const path = parentRoute.entity.path + '/' + matchValues.pop();
            apiGet({
                path,
                params: {},
                successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                    setParentRow(data);
                }),
                cancelToken,
            });
        }
    }, [parentRow, match]);
    if (empty) {
        return _jsx(StyledEmpty, { entityService: entityService, className: className });
    }
    return (_jsxs(_Fragment, { children: [_jsxs(Box, Object.assign({ className: className }, { children: [mobile && (_jsx(ListContentHeader, { path: path, entityService: entityService, ignoreColumn: ignoreColumn, preloadData: preloadData, cancelToken: cancelToken, match: match, location: location, selectedValues: selectedValues, mobile: true, parentRow: parentRow, ref: ref })), _jsxs(Box, Object.assign({ className: 'card' }, { children: [!mobile && (_jsx(ListContentHeader, { path: path, entityService: entityService, ignoreColumn: ignoreColumn, preloadData: preloadData, cancelToken: cancelToken, match: match, location: location, selectedValues: selectedValues, parentRow: parentRow, ref: ref })), !mobile && (_jsx(Box, Object.assign({ sx: { overflowX: 'auto' } }, { children: _jsx(StyledContentTable, { entityService: entityService, ignoreColumn: ignoreColumn, path: path, childEntities: childEntities, selectedValues: selectedValues, handleChange: handleChange, setSelectedValues: setSelectedValues }) }))), mobile && (_jsx(Box, { children: _jsx(ContentCard, { selectedValues: selectedValues, handleChange: handleChange, entityService: entityService, ignoreColumn: ignoreColumn, path: path, childEntities: childEntities }) }))] }))] })), _jsxs(Box, Object.assign({ component: 'footer' }, { children: [mobile && (_jsx("a", Object.assign({ onClick: selectAllHandler, className: 'link' }, { children: _('Select all') }))), _jsx(Box, Object.assign({ className: 'pagination' }, { children: _jsx(Pagination, { listRef: listRef }) }))] }))] }));
};
export default forwardRef(ListContent);
