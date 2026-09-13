import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@mui/material';
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
import { StyledTableRowEntityCta } from '../Table/ContentTable.styles';
import buildLink from './BuildLink';
const ChildEntityLink = (props) => {
    var _a;
    const { routeMapItem, row, disabled = false } = props;
    const match = useCurrentPathMatch();
    const entity = routeMapItem.entity;
    const Icon = entity.icon;
    const title = entity.title;
    const baseUrl = process.env.BASE_URL || '/';
    const link = buildLink({
        link: `${baseUrl}${(_a = routeMapItem.route) === null || _a === void 0 ? void 0 : _a.substring(1)}`,
        id: row.id,
        params: match.params,
    });
    return (_jsx(Tooltip, Object.assign({ title: title, placement: 'bottom-start', enterTouchDelay: 0, arrow: true }, { children: _jsx("span", { children: _jsx(StyledTableRowEntityCta, Object.assign({ to: link, parentEntity: entity, parentRow: row, disabled: disabled }, { children: _jsx(Icon, {}) })) }) })));
};
export default ChildEntityLink;
