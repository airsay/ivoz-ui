var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStoreActions } from '../store';
import useCancelToken from './useCancelToken';
const useParentRow = (props) => {
    const { parentEntity } = props;
    let { parentId } = props;
    const params = useParams();
    let { cancelToken } = props;
    if (!cancelToken) {
        [, cancelToken] = useCancelToken();
    }
    if (!parentId) {
        const myParams = Object.assign({}, params);
        for (const idx in myParams) {
            if (idx.indexOf('parent_id') === 0) {
                continue;
            }
            delete myParams[idx];
        }
        parentId = Object.values(myParams).pop() || '';
    }
    const [row, setRow] = useState(undefined);
    const apiGet = useStoreActions((actions) => {
        return actions.api.get;
    });
    useEffect(() => {
        if (!parentId) {
            setRow(null);
            return;
        }
        apiGet({
            path: parentEntity.path + `/${parentId}`,
            params: {},
            successCallback: (data) => __awaiter(void 0, void 0, void 0, function* () {
                setRow(data);
            }),
            cancelToken,
        });
    }, [parentId, parentEntity]);
    return row;
};
export default useParentRow;
