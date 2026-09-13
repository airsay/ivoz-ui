import { useFormikType } from '../../../services';
import { EntityFormProps } from './Form';
declare type UseFormHandlerProps = Pick<EntityFormProps, 'create' | 'entityService' | 'fixedValues' | 'filterValues' | 'filterBy' | 'initialValues' | 'onSubmit' | 'validator'>;
declare const useFormHandler: (props: UseFormHandlerProps) => useFormikType;
export { useFormHandler };
