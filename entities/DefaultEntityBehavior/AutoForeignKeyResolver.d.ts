import { EntityValues } from '../../services/entity/EntityService';
import { foreignKeyResolverProps } from '../EntityInterface';
declare const autoForeignKeyResolver: (props: foreignKeyResolverProps) => Array<Promise<EntityValues | EntityValues[]>>;
export default autoForeignKeyResolver;
