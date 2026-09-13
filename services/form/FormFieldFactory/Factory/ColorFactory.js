import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StyledColorField } from '../../Field/TextField/TextField.styles';
import { SketchPicker } from 'react-color';
import { useState } from 'react';
import { StyledColorPickerButton } from '../../../../components/shared/Button/Button.styles';
import { StyledColorFactoryContainer, StyledSketchPickerContainer, } from '../FormFieldFactory.styles';
import ColorLensRoundedIcon from '@mui/icons-material/ColorLensRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
export const ColorFactory = (props) => {
    const { fld, property, parentRef, value, hasChanged, error, touched, inputProps, InputProps, changeHandler, handleBlur, } = props;
    const [display, setDisplay] = useState('hidden');
    const [position, setPosition] = useState(undefined);
    return (_jsxs(StyledColorFactoryContainer, { children: [_jsx(StyledColorPickerButton, Object.assign({ variant: 'contained', style: { color: value }, onClick: (event) => {
                    var _a, _b, _c;
                    display === 'hidden' ? setDisplay('initial') : setDisplay('hidden');
                    const rect = (_a = parentRef === null || parentRef === void 0 ? void 0 : parentRef.current) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect();
                    const mouseX = event.clientX - ((_b = rect === null || rect === void 0 ? void 0 : rect.left) !== null && _b !== void 0 ? _b : 0);
                    const mouseY = event.clientY - ((_c = rect === null || rect === void 0 ? void 0 : rect.top) !== null && _c !== void 0 ? _c : 0);
                    setPosition({ x: mouseX, y: mouseY });
                } }, { children: display === 'hidden' ? _jsx(ColorLensRoundedIcon, {}) : _jsx(CloseRoundedIcon, {}) })), _jsx(StyledColorField, { name: fld, type: 'text', multiline: false, value: value, disabled: true, required: property.required, onBlur: handleBlur, error: touched && Boolean(error), errorMsg: touched && error, helperText: property.helpText, InputProps: InputProps, inputProps: inputProps, hasChanged: hasChanged }), _jsx(StyledSketchPickerContainer, Object.assign({ visibility: display, mouseposition: position }, { children: _jsx(SketchPicker, { color: value, onChange: (color, event) => {
                        changeHandler(Object.assign(Object.assign({}, event), { target: Object.assign(Object.assign({}, event.target), { name: fld, value: color.hex }) }));
                    }, disableAlpha: true, presetColors: property.presets }) }))] }));
};
