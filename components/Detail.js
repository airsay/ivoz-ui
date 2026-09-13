import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import withRowData from './withRowData';
import { Box } from '@mui/material';
import useCurrentPathMatch from '../hooks/useCurrentPathMatch';
const Detail = (props) => {
    const { View: EntityViewLoader, row } = props;
    const [EntityView, setEntityView] = useState(null);
    const match = useCurrentPathMatch();
    useEffect(() => {
        EntityViewLoader().then((View) => {
            setEntityView(() => View);
        });
    }, []);
    if (!EntityView) {
        return null;
    }
    return (_jsx(Box, Object.assign({ className: 'card' }, { children: _jsx(EntityView, Object.assign({}, props, { row: row, match: match })) })));
};
export default withRowData(Detail);
