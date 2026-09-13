import { useEffect, useState } from 'react';
import axios from 'axios';
const useFkChoices = (props) => {
    const { foreignKeyGetter, entityService, row, match, skip, disabled } = props;
    const [fkChoices, setFkChoices] = useState({});
    useEffect(() => {
        if (disabled) {
            return;
        }
        let mounted = true;
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        foreignKeyGetter({
            cancelToken: source.token,
            entityService,
            row,
            match,
            skip,
        }).then((options) => {
            if (!mounted) {
                return;
            }
            setFkChoices((fkChoices) => {
                return Object.assign(Object.assign({}, fkChoices), options);
            });
        });
        return () => {
            mounted = false;
            source.cancel();
        };
    }, [foreignKeyGetter, entityService, row, match, disabled]);
    return fkChoices;
};
export default useFkChoices;
