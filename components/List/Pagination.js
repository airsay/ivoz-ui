import { jsx as _jsx } from "react/jsx-runtime";
import { TablePagination } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as locales from '@mui/material/locale';
import { getI18n } from 'react-i18next';
import { useStoreState, useStoreActions } from '../../store';
import { ROUTE_ITEMS_PER_PAGE_KEY, ROUTE_PAGE_KEY } from '../../store/route';
export default function Pagination(props) {
    var _a;
    const { listRef } = props;
    const loading = useStoreState((state) => state.api.loading);
    const itemsPerPage = useStoreState((state) => state.route.itemsPerPage);
    const headers = useStoreState((state) => state.list.headers);
    const page = useStoreState((state) => state.route.page);
    const i18n = getI18n();
    const recordCount = parseInt((_a = headers['x-total-items']) !== null && _a !== void 0 ? _a : 0, 10);
    const locale = i18n.language.replace('-', '');
    const replaceInQueryStringCriteria = useStoreActions((actions) => {
        return actions.route.replaceInQueryStringCriteria;
    });
    const scrollToTop = () => {
        listRef.current &&
            listRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'end',
            });
    };
    const setItemsPerPage = (value) => {
        if (loading) {
            return;
        }
        const criteria = {
            name: ROUTE_ITEMS_PER_PAGE_KEY,
            type: '',
            value,
        };
        replaceInQueryStringCriteria(criteria);
        const pageCriteria = {
            name: ROUTE_PAGE_KEY,
            type: '',
            value: 1,
        };
        replaceInQueryStringCriteria(pageCriteria);
        scrollToTop();
    };
    const setPage = (value) => {
        if (loading) {
            return;
        }
        const criteria = {
            name: ROUTE_PAGE_KEY,
            type: '',
            value,
        };
        replaceInQueryStringCriteria(criteria);
        scrollToTop();
    };
    if (recordCount === 0) {
        return null;
    }
    return (_jsx(ThemeProvider, Object.assign({ theme: (outerTheme) => createTheme(outerTheme, locales[locale]) }, { children: _jsx(TablePagination, { component: 'div', page: (page || 1) - 1, rowsPerPage: itemsPerPage, rowsPerPageOptions: [10, 25, 50, 100], count: recordCount, backIconButtonProps: {
                'aria-label': 'previous page',
            }, nextIconButtonProps: {
                'aria-label': 'next page',
            }, onPageChange: (event, newPage) => {
                setPage(newPage + 1);
            }, onRowsPerPageChange: (newRowsPerpage) => {
                setItemsPerPage(newRowsPerpage.target.value);
            } }) })));
}
