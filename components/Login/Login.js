var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Container } from '@mui/material';
import { useFormik } from 'formik';
import { useStoreActions, useStoreState } from 'store';
import ErrorMessage from '../..//components/shared/ErrorMessage';
import Title from '../../components/Title';
import { StyledForm } from './Login.styles';
import { SolidButton } from '../../components/shared/Button/Button.styles';
import { TextField } from '../../services/form/Field';
import _ from '../../services/translations/translate';
export default function Login(props) {
    const { validator, marshaller, unauthorizedCustomErrorMsg, className } = props;
    const useRefreshToken = useStoreActions((actions) => actions.auth.useRefreshToken);
    const logo = useStoreState((state) => state.theme.logo);
    const onSubmit = useStoreActions((actions) => actions.auth.submit);
    const refreshToken = useStoreState((state) => state.auth.refreshToken);
    const apiErrorMsg = useStoreState((state) => state.api.errorMsg);
    const apiErrorCode = useStoreState((state) => state.api.errorCode);
    if (refreshToken) {
        useRefreshToken();
        return null;
    }
    const submit = (values) => __awaiter(this, void 0, void 0, function* () {
        if (marshaller) {
            values = marshaller(values);
        }
        yield onSubmit(values);
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validator,
        onSubmit: submit,
    });
    const errorMsg = apiErrorCode === 401 && unauthorizedCustomErrorMsg
        ? unauthorizedCustomErrorMsg
        : apiErrorMsg;
    return (_jsxs(Container, Object.assign({ className: className, component: 'main' }, { children: [_jsx(Box, Object.assign({ className: 'logo-container' }, { children: _jsx("img", { src: logo || './logo.svg', className: 'logo' }) })), _jsx(Box, Object.assign({ className: 'form-container' }, { children: _jsxs(StyledForm, Object.assign({ onSubmit: formik.handleSubmit, className: 'card' }, { children: [_jsx(Title, { children: _('Welcome back!') }), _jsx(TextField, { name: 'username', type: 'text', label: _('Username'), placeholder: 'Your username', value: formik.values.username, onChange: formik.handleChange, error: formik.touched.username && Boolean(formik.errors.username), hasChanged: false, inputProps: {}, InputProps: {}, errorMsg: '', helperText: formik.touched.username &&
                                formik.errors.username }), _jsx(TextField, { name: 'password', type: 'password', label: _('Password'), placeholder: 'Typer your password', errorMsg: '', value: formik.values.password, onChange: formik.handleChange, error: formik.touched.password && Boolean(formik.errors.password), hasChanged: false, inputProps: {}, InputProps: {}, helperText: formik.touched.password &&
                                formik.errors.password }), _jsx(SolidButton, Object.assign({ type: 'submit', variant: 'contained' }, { children: _('Sign In') })), apiErrorMsg && _jsx(ErrorMessage, { message: errorMsg || '' })] })) }))] })));
}
