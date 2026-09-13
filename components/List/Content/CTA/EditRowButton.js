import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { StyledTableRowCta } from '../Table/ContentTable.styles';
import _ from '../../../../services/translations/translate';
import buildLink from '../Shared/BuildLink';
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
const EditRowButton = (props) => {
    const { row, disabled = false } = props;
    const match = useCurrentPathMatch();
    const link = buildLink({
        link: match.pattern.path,
        params: match.params,
    });
    return (_jsx(Tooltip, Object.assign({ title: _('Edit'), placement: 'bottom', arrow: true }, { children: _jsx("span", { children: _jsx(StyledTableRowCta, Object.assign({ disabled: disabled, to: `${link}/${row.id}/update` }, { children: _jsx(EditIcon, {}) })) }) })));
};
export default EditRowButton;
