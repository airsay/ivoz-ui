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
import { useState, useEffect } from 'react';
import hoistStatics from 'hoist-non-react-statics';
import { useStoreActions, useStoreState } from '../store';
import useCancelToken from '../hooks/useCancelToken';
import { useLocation, useParams } from 'react-router-dom';
const withRowData = (Component) => {
    const displayName = `withRowData(${Component.displayName || Component.name})`;
    const C = (props) => {
        const { entityService } = props;
        const location = useLocation();
        const params = useParams();
        const entityId = params.id;
        const [loading, setLoading] = useState(true);
        const row = useStoreState((state) => state.form.row);
        const resetFormRow = useStoreActions((actions) => {
            return actions.form.reset;
        });
        const setFormRow = useStoreActions((actions) => {
            return actions.form.setRow;
        });
        const apiGet = useStoreActions((actions) => {
            return actions.api.get;
        });
        const [, cancelToken] = useCancelToken();
        useEffect(() => {
            setLoading(true);
        }, [location, setLoading]);
        useEffect(() => {
            resetFormRow();
            return () => {
                resetFormRow();
            };
        }, []);
        useEffect(() => {
            const mounted = true;
            if (loading) {
                const itemPath = entityService.getItemPath();
                if (!itemPath) {
                    throw new Error('Unknown item path');
                }
                apiGet({
                    path: itemPath.replace('{id}', entityId),
                    params: {},
                    successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                        if (!mounted) {
                            return;
                        }
                        setFormRow(data);
                        setLoading(false);
                    }),
                    cancelToken,
                });
            }
        }, [loading, entityId, entityService, apiGet]);
        if (loading) {
            return null;
        }
        return _jsx(Component, Object.assign({ row: row }, props));
    };
    C.displayName = displayName;
    C.WrappedComponent = Component;
    return hoistStatics(C, Component);
};
export default withRowData;
