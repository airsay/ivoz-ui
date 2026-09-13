var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useCancelToken from '../hooks/useCancelToken';
import useCurrentPathMatch from '../hooks/useCurrentPathMatch';
import findRoute from '../router/findRoute';
import { useStoreActions } from '../store';
import ErrorBoundary from './ErrorBoundary';
import { getMarshallerWhiteList } from './form.helper';
import withRowData from './withRowData';
import { Box } from '@mui/material';
import _ from '../services/translations/translate';
const Edit = (props) => {
    var _a;
    const { marshaller, unmarshaller, row, routeMap, entityService } = props;
    const { Form: EntityFormLoader } = props;
    const [EntityForm, setEntityForm] = useState(null);
    const match = useCurrentPathMatch();
    const [prevPathname, setPrevPathname] = useState(null);
    useEffect(() => {
        if (match.pathname !== prevPathname) {
            setPrevPathname(match.pathname);
            if (EntityForm) {
                setEntityForm(null);
                return;
            }
        }
        EntityFormLoader().then((Form) => {
            setEntityForm(() => Form);
        });
    }, [match.pathname]);
    const setFlashMsg = useStoreActions((actions) => actions.flashMsg.setFlashMsg);
    const location = useLocation();
    const navigate = useNavigate();
    const parentRoute = findRoute(routeMap, match);
    const filterBy = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.filterBy;
    const fixedValues = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.fixedValues;
    const filterValues = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.filterValues;
    const baseUrl = process.env.BASE_URL || '/';
    let parentPath = parentRoute
        ? `${baseUrl}${(_a = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.route) === null || _a === void 0 ? void 0 : _a.substring(1)}`
        : null;
    if (parentPath) {
        for (const idx in match.params) {
            parentPath = parentPath.replace(`:${idx}`, match.params[idx]);
        }
    }
    const entityId = match.params.id;
    const apiPut = useStoreActions((actions) => actions.api.put);
    const [, cancelToken] = useCancelToken();
    const properties = entityService.getProperties();
    const initialValues = Object.assign(Object.assign({}, entityService.getDefultValues()), unmarshaller(row, properties));
    const onSubmit = (values, actions) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        const putPath = entityService.getPutPath();
        if (!putPath) {
            throw new Error('Unknown item path');
        }
        const whitelist = getMarshallerWhiteList({
            filterBy,
            fixedValues,
            filterValues,
        });
        const payload = marshaller(values, entityService.getAllProperties(), whitelist);
        const formData = entityService.prepareFormData(payload);
        try {
            const resp = yield apiPut({
                path: putPath.replace('{id}', entityId),
                values: formData,
                cancelToken,
            });
            if (resp !== undefined) {
                const referrer = ((_b = location.state) === null || _b === void 0 ? void 0 : _b.referrer) || '';
                const targetPath = referrer.search(parentPath) === 0 ? referrer : parentPath;
                if (targetPath === null || targetPath === location.pathname) {
                    setFlashMsg({
                        msg: _('Entity sucessfully updated'),
                        type: 'success',
                    });
                    return;
                }
                navigate(targetPath, {
                    state: {
                        referrer: location.pathname,
                    },
                });
            }
            else {
                console.info('unexpected form response', resp);
            }
        }
        catch (error) {
            console.error(error);
        }
        finally {
            actions.setSubmitting(false);
        }
    });
    if (!EntityForm) {
        return null;
    }
    if (prevPathname !== match.pathname) {
        return null;
    }
    return (_jsx(Box, Object.assign({ className: 'card' }, { children: _jsx(ErrorBoundary, { children: _jsx(EntityForm, Object.assign({}, props, { initialValues: initialValues, filterBy: filterBy, fixedValues: fixedValues, filterValues: filterValues, onSubmit: onSubmit, edit: true, match: match })) }) })));
};
export default withRowData(Edit);
