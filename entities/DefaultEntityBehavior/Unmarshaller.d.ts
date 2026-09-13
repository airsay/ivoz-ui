import { PartialPropertyList } from '../../services/api/ParsedApiSpecInterface';
import { MarshallerValues } from './Marshaller';
declare const unmarshaller: (row: MarshallerValues, properties: PartialPropertyList) => MarshallerValues;
export default unmarshaller;
