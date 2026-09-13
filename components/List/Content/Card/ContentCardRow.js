import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Typography } from '@mui/material';
import ListContentValue from '../ListContentValue';
import { CardSelector } from './CardSelector';
const ContentCardRow = (props) => {
    const { columnName, multiselect, isFirstRow, column, row, selectedValues, entityService, handleMultiselectChange, expanded, setExpanded, } = props;
    const toggleExpanded = () => {
        setExpanded(!expanded);
    };
    const expandIconClass = expanded ? 'expanded' : '';
    return (_jsxs(Box, { children: [multiselect && isFirstRow && (_jsx(CardSelector, { row: row, selectable: multiselect, selectedValues: selectedValues, handleChange: handleMultiselectChange })), _jsxs(Typography, Object.assign({ onClick: toggleExpanded, sx: { display: 'flex' } }, { children: [_jsxs("span", { children: [column.label, ":"] }), _jsx(ListContentValue, { columnName: columnName, column: column, row: row, entityService: entityService })] })), isFirstRow && (_jsx(ExpandMoreIcon, { onClick: toggleExpanded, className: expandIconClass }))] }));
};
export default ContentCardRow;
