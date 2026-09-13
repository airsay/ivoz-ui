/// <reference types="react" />
import { EntityValidator } from '../../entities/EntityInterface';
declare type marshallerValueType = {
    username: string;
    password: string;
};
export interface LoginProps {
    unauthorizedCustomErrorMsg?: string;
    validator?: EntityValidator;
    marshaller?: (values: marshallerValueType) => Record<string, string>;
    className?: string;
}
export default function Login(props: LoginProps): JSX.Element | null;
export {};
