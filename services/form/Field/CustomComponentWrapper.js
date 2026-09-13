import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledFieldsetRoot, StyledFieldset, } from './CustomComponentWrapper.styles';
import { StyledHelpTextTooltip } from './Shared/HelpText.styles';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
export var CustomFunctionComponentContext;
(function (CustomFunctionComponentContext) {
    CustomFunctionComponentContext["write"] = "write";
    CustomFunctionComponentContext["read"] = "read";
})(CustomFunctionComponentContext || (CustomFunctionComponentContext = {}));
export const CustomComponentWrapper = (props) => {
    const { property, hasChanged, disabled } = props;
    const helpText = property.helpText;
    const label = helpText ? (_jsxs(_Fragment, { children: [property.label, _jsx(StyledHelpTextTooltip, Object.assign({ title: helpText, placement: 'top', arrow: true, className: 'help-tooltip' }, { children: _jsx(HelpOutlineIcon, {}) }))] })) : (property.label);
    return (_jsx(StyledFieldsetRoot, Object.assign({ label: label, hasChanged: hasChanged, disabled: disabled }, { children: _jsx(StyledFieldset, { children: props.children }) })));
};
const withCustomComponentWrapper = function (InnerComponent) {
    const displayName = `withCustomComponentWrapper(${InnerComponent.displayName || InnerComponent.name})`;
    const WrappedComponent = (props) => {
        const { property, hasChanged, _context, formik, disabled } = props;
        const isListValue = !formik && _context === CustomFunctionComponentContext.read;
        if (isListValue) {
            return _jsx(InnerComponent, Object.assign({}, props));
        }
        return (_jsx(CustomComponentWrapper, Object.assign({ property: property, hasChanged: hasChanged, disabled: disabled }, { children: _jsx(InnerComponent, Object.assign({}, props)) })));
    };
    WrappedComponent.displayName = displayName;
    return WrappedComponent;
};
export default withCustomComponentWrapper;
