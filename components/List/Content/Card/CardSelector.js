import { jsx as _jsx } from "react/jsx-runtime";
import { Checkbox } from '@mui/material';
export const CardSelector = (props) => {
    const { row, selectable } = props;
    const { selectedValues, handleChange } = props;
    const checked = selectedValues.indexOf(row.id.toString()) > -1;
    if (!selectable) {
        return null;
    }
    return (_jsx(Checkbox, { name: `${row.id}`, checked: checked, onChange: handleChange }));
};
