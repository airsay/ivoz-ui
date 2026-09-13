import { PartialPropertyList } from '../../services/api/ParsedApiSpecInterface';
export declare type MarshallerValues = {
    [key: string]: any;
};
declare const marshaller: (values: MarshallerValues, properties: PartialPropertyList, whitelist?: string[]) => MarshallerValues;
export default marshaller;
