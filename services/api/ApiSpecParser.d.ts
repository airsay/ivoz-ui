import OpenApiSpecInterface from './OpenApiSpecInterface';
import ParsedApiSpecInterface from './ParsedApiSpecInterface';
export default class ApiSpecParser {
    parse(spec: OpenApiSpecInterface): ParsedApiSpecInterface;
    private parseSpec;
    private isCollection;
    private getCollectionPaths;
    private isItem;
    private getItemPaths;
    getEntityBasePath(entityNameRoot: string): string;
    private getEntityPaths;
    private filterByRequestSchema;
    private filterByResponseSchema;
    private isUploadAction;
}
