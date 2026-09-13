import { jsx as _jsx } from "react/jsx-runtime";
import { Tooltip } from '@mui/material';
import PanoramaIcon from '@mui/icons-material/Panorama';
import { StyledTableRowCta } from '../Table/ContentTable.styles';
import _ from '../../../../services/translations/translate';
import buildLink from '../Shared/BuildLink';
import useCurrentPathMatch from '../../../../hooks/useCurrentPathMatch';
const ViewRowButton = (props) => {
    const { row } = props;
    const match = useCurrentPathMatch();
    const link = buildLink({
        link: match.pattern.path,
        params: match.params,
    });
    return (_jsx(Tooltip, Object.assign({ title: _('View'), placement: 'bottom', enterTouchDelay: 0, arrow: true }, { children: _jsx(StyledTableRowCta, Object.assign({ to: `${link}/${row.id}/detailed` }, { children: _jsx(PanoramaIcon, {}) })) })));
};
export default ViewRowButton;
