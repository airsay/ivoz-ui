var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable no-script-url */
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ErrorBoundary from '../../components/ErrorBoundary';
import useCancelToken from '../../hooks/useCancelToken';
import useCurrentPathMatch from '../../hooks/useCurrentPathMatch';
import useRouteChain from '../../hooks/useRouteChain';
import findRoute from '../../router/findRoute';
import { isPropertyFk } from '../../services';
import { useStoreActions, useStoreState } from '../../store';
import ErrorMessage from '../shared/ErrorMessage';
import useFirstColumn from './Content/hook/useFirstColumn';
import { criteriaToArray, queryStringToCriteria } from './List.helpers';
import useQueryStringParams from './useQueryStringParams';
const List = function (props) {
    const { path, foreignKeyResolver, entityService, routeMap, className, List: EntityListDecorator, } = props;
    const location = useLocation();
    const match = useCurrentPathMatch();
    const params = useParams();
    const navigate = useNavigate();
    const currentRoute = findRoute(routeMap, match);
    const routeChain = useRouteChain({
        routeMap,
        match,
    });
    const [dataRequested, setHasBeenDataRequested] = useState(false);
    const reloadTimestamp = useStoreState((store) => store.list.reloadTimestamp);
    const resetList = useStoreActions((actions) => {
        return actions.list.reset;
    });
    const setRows = useStoreActions((actions) => {
        return actions.list.setRows;
    });
    const setHeaders = useStoreActions((actions) => {
        return actions.list.setHeaders;
    });
    const reqError = useStoreState((store) => store.api.errorMsg);
    const apiGet = useStoreActions((actions) => {
        return actions.api.get;
    });
    const defaultItemsPerPage = useStoreState((state) => state.route.defaultItemsPerPage);
    const [mounted, cancelToken] = useCancelToken();
    const [criteriaIsReady, setCriteriaIsReady] = useState(false);
    const queryStringCriteria = useStoreState((state) => state.route.queryStringCriteria);
    const setQueryStringCriteria = useStoreActions((actions) => {
        return actions.route.setQueryStringCriteria;
    });
    const [prevPath, setPrevPath] = useState('');
    useEffect(() => {
        resetList();
        setPrevPath(path);
    }, [path]);
    ////////////////////////////
    // Filters
    ////////////////////////////
    const currentQueryParams = useQueryStringParams();
    const filterBy = [];
    if (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.filterBy) {
        filterBy.push(currentRoute.filterBy);
        filterBy.push(Object.values(params).pop());
    }
    const ignoreColumn = filterBy[0];
    const [, firstColumnSpec] = useFirstColumn({
        entityService,
        ignoreColumn,
    });
    const isFirstColumnFk = isPropertyFk(firstColumnSpec);
    const preload = currentQueryParams.length > 0 || isFirstColumnFk;
    const filterValues = [];
    const entityFilterValues = (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.filterValues) || {};
    for (const idx in entityFilterValues) {
        const value = entityFilterValues[idx];
        if (Array.isArray(value)) {
            for (const valueInArray of value) {
                filterValues.push(`${idx}[]=${valueInArray}`);
            }
            continue;
        }
        const param = value !== null ? `${idx}=${value}` : `${idx}`;
        filterValues.push(param);
    }
    const filterByStr = filterBy.join('[]=');
    const reqQuerystring = currentQueryParams.join('&');
    const [prevReqQuerystring, setPrevReqQuerystring] = useState(null);
    useEffect(() => {
        // Path change listener
        if (reqQuerystring === prevReqQuerystring) {
            return;
        }
        setPrevReqQuerystring(reqQuerystring);
        const criteria = queryStringToCriteria();
        const sanitizeData = criteria.map((row) => {
            return Object.assign(Object.assign({}, row), { value: encodeURIComponent(row.value) });
        });
        setQueryStringCriteria(sanitizeData);
        setCriteriaIsReady(true);
    }, [
        reqQuerystring,
        prevReqQuerystring,
        setPrevReqQuerystring,
        setQueryStringCriteria,
        setCriteriaIsReady,
    ]);
    useEffect(() => {
        // Criteria change listener
        if (reqQuerystring !== prevReqQuerystring) {
            return;
        }
        const newReqQuerystring = criteriaToArray(queryStringCriteria).join('&');
        if (reqQuerystring === newReqQuerystring) {
            return;
        }
        let referrer = location.pathname;
        if (newReqQuerystring) {
            referrer += `?${newReqQuerystring}`;
        }
        // Change path
        navigate({
            pathname: location.pathname,
            search: newReqQuerystring,
        }, {
            state: {
                referrer,
            },
        });
    }, [
        reqQuerystring,
        prevReqQuerystring,
        location.pathname,
        queryStringCriteria,
        history,
    ]);
    useEffect(() => {
        if (!mounted) {
            return;
        }
        setHasBeenDataRequested(false);
        // Fetch data request
        if (!criteriaIsReady) {
            return;
        }
        const qsEncoder = (item) => item
            .split('=')
            .map((val) => encodeURIComponent(val))
            .join('=');
        let reqPath = path;
        if (currentQueryParams.length) {
            reqPath =
                path +
                    '?' +
                    [...currentQueryParams, ...filterValues, filterByStr]
                        .map(qsEncoder)
                        .join('&');
        }
        else if (filterByStr || filterValues.length > 0) {
            reqPath =
                path + '?' + [...filterValues, filterByStr].map(qsEncoder).join('&');
        }
        let page = currentQueryParams.find((str) => str.indexOf('_page=') === 0);
        if (!page) {
            page = encodeURI(`_page=1`);
            const glue = reqPath.indexOf('?') !== -1 ? '&' : '?';
            reqPath += `${glue}${page}`;
        }
        let itemsPerPage = currentQueryParams.find((str) => str.indexOf('_itemsPerPage=') === 0);
        if (!itemsPerPage) {
            itemsPerPage = encodeURI(`_itemsPerPage=${defaultItemsPerPage}`);
            const glue = reqPath.indexOf('?') !== -1 ? '&' : '?';
            reqPath += `${glue}${itemsPerPage}`;
        }
        let orderBy = currentQueryParams.find((str) => str.indexOf('_order[') === 0);
        if (!orderBy && entityService.getOrderBy() !== '') {
            orderBy = encodeURI(`_order[${entityService.getOrderBy()}]=${entityService.getOrderDirection()}`);
            const glue = reqPath.indexOf('?') !== -1 ? '&' : '?';
            reqPath += `${glue}${orderBy}`;
        }
        apiGet({
            path: reqPath,
            cancelToken,
            successCallback: (data, headers) => __awaiter(this, void 0, void 0, function* () {
                if (!mounted) {
                    return;
                }
                if (headers) {
                    setHeaders(headers);
                }
                setRows(data);
                foreignKeyResolver().then((foreignKeyResolver) => {
                    foreignKeyResolver({
                        data,
                        allowLinks: true,
                        entityService,
                        cancelToken,
                    }).then((data) => {
                        if (!mounted) {
                            return;
                        }
                        const fixedData = [];
                        for (const idx in data) {
                            fixedData.push(data[idx]);
                        }
                        setRows(fixedData);
                    });
                });
                setHasBeenDataRequested(true);
            }),
        });
    }, [
        foreignKeyResolver,
        entityService,
        criteriaIsReady,
        path,
        currentQueryParams,
        apiGet,
        reqQuerystring,
        filterByStr,
        cancelToken,
        mounted,
        reloadTimestamp,
    ]);
    const rows = useStoreState((state) => state.list.rows);
    if (prevPath !== path) {
        return null;
    }
    if (!criteriaIsReady || !mounted || !dataRequested) {
        return null;
    }
    const empty = (!rows || rows.length === 0) && queryStringCriteria.length === 0;
    return (_jsx("div", Object.assign({ className: className }, { children: _jsxs(ErrorBoundary, { children: [_jsx(EntityListDecorator, { empty: empty, childEntities: (currentRoute === null || currentRoute === void 0 ? void 0 : currentRoute.children) || [], path: path, ignoreColumn: ignoreColumn, preloadData: preload, entityService: entityService, cancelToken: cancelToken, match: match, routeChain: routeChain, location: location }), reqError && _jsx(ErrorMessage, { message: reqError })] }) })));
};
export default List;
