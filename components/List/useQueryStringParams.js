/* eslint-disable no-script-url */
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { criteriaToArray, stringToCriteria } from './List.helpers';
const useQueryStringParams = function () {
    const { search } = useLocation();
    return useMemo(() => {
        const uriCriteria = stringToCriteria(search);
        return criteriaToArray(uriCriteria);
    }, [search]);
};
export default useQueryStringParams;
