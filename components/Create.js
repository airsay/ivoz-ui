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
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useCancelToken from '../hooks/useCancelToken';
import useCurrentPathMatch from '../hooks/useCurrentPathMatch';
import findRoute from '../router/findRoute';
import _ from '../services/translations/translate';
import { useStoreActions } from '../store';
import ErrorBoundary from './ErrorBoundary';
import { getMarshallerWhiteList } from './form.helper';
const Create = (props) => {
    var _a, _b;
    const { marshaller, unmarshaller, path, routeMap, entityService } = props;
    const { Form: EntityFormLoader } = props;
    const [EntityForm, setEntityForm] = useState(null);
    useEffect(() => {
        EntityFormLoader()
            .then((Form) => {
            setEntityForm(() => Form);
        })
            .catch((error) => {
            console.error(error);
        });
    }, []);
    const setFlashMsg = useStoreActions((actions) => actions.flashMsg.setFlashMsg);
    const location = useLocation();
    const match = useCurrentPathMatch();
    const params = useParams();
    const navigate = useNavigate();
    const parentRoute = findRoute(routeMap, match);
    const filterBy = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.filterBy;
    const fixedValues = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.fixedValues;
    const filterValues = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.filterValues;
    const sanitizedInitialFilterValues = Object.fromEntries(Object.entries(filterValues || {}).filter(([key, value]) => {
        return key.indexOf('[') === -1 && !Array.isArray(value);
    }));
    const baseUrl = process.env.BASE_URL || '/';
    let parentPath = `${baseUrl}${(_a = parentRoute === null || parentRoute === void 0 ? void 0 : parentRoute.route) === null || _a === void 0 ? void 0 : _a.substring(1)}` || '';
    for (const idx in params) {
        parentPath = parentPath.replace(`:${idx}`, params[idx]);
    }
    const apiPost = useStoreActions((actions) => actions.api.post);
    const [, cancelToken] = useCancelToken();
    const properties = entityService.getProperties();
    let initialValues = Object.assign(Object.assign(Object.assign(Object.assign({}, entityService.getDefultValues()), props.initialValues), fixedValues), sanitizedInitialFilterValues);
    for (const idx in properties) {
        if (initialValues[idx] !== undefined) {
            continue;
        }
        const isBoolean = ((_b = properties[idx]) === null || _b === void 0 ? void 0 : _b.type) === 'boolean';
        initialValues[idx] = isBoolean ? 0 : '';
    }
    initialValues = unmarshaller(initialValues, properties);
    const onSubmit = (values, actions) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const whitelist = getMarshallerWhiteList({
            filterBy,
            fixedValues,
            filterValues,
        });
        const payload = marshaller(values, entityService.getAllProperties(), whitelist);
        const formData = entityService.prepareFormData(payload);
        try {
            const resp = yield apiPost({
                path,
                values: formData,
                contentType: 'application/json',
                cancelToken,
            });
            if (resp !== undefined) {
                const referrer = ((_c = location.state) === null || _c === void 0 ? void 0 : _c.referrer) || '';
                const targetPath = referrer.search(parentPath) === 0 ? referrer : parentPath;
                if (targetPath === null || targetPath === location.pathname) {
                    setFlashMsg({
                        msg: _('Entity sucessfully created'),
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
    return (_jsx(Box, Object.assign({ className: 'card' }, { children: _jsx(ErrorBoundary, { children: _jsx(EntityForm, Object.assign({}, props, { filterBy: filterBy, fixedValues: fixedValues, filterValues: filterValues, initialValues: initialValues, onSubmit: onSubmit, entityService: entityService, create: true, match: match })) }) })));
};
export default Create;
