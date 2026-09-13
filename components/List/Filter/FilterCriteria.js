import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Chip, Tooltip } from '@mui/material';
import { useStoreState } from 'store';
import { isPropertyFk } from '../../../services/api/ParsedApiSpecInterface';
import { getFilterLabel } from './icons/FilterIconFactory';
export function FilterCriteria(props) {
    const { entityService, fkChoices, removeFilter, criteriaOverride } = props;
    const storeState = useStoreState((state) => state, () => {
        return true;
    });
    const columns = entityService.getCollectionParamList(storeState);
    const criteria = criteriaOverride ||
        useStoreState((state) => state.route.queryStringCriteria);
    return (_jsx(_Fragment, { children: criteria.map((criteriaValue, idx) => {
            var _a;
            const { name, type, value } = criteriaValue;
            const column = columns[name];
            if (!column) {
                return null;
            }
            const fieldStr = column.label;
            let valueStr = value;
            if (isPropertyFk(column)) {
                const choice = fkChoices[name];
                if (Array.isArray(choice)) {
                    const arrayChoice = choice.find((row) => `${row.id}` === value);
                    valueStr = (arrayChoice === null || arrayChoice === void 0 ? void 0 : arrayChoice.label) || '';
                }
                else {
                    valueStr = (_a = fkChoices[name]) === null || _a === void 0 ? void 0 : _a[value];
                }
            }
            else if (column.enum) {
                valueStr = column.enum[value];
            }
            const tooltipTitle = (_jsxs("span", { children: [fieldStr, " \u00A0", getFilterLabel(type), " \u00A0", valueStr] }));
            return (_jsx(Tooltip, Object.assign({ title: tooltipTitle }, { children: _jsx(Chip, { label: fieldStr, onDelete: () => {
                        removeFilter(idx);
                    }, deleteIcon: _jsx(CloseRoundedIcon, {}) }) }), idx));
        }) }));
}
