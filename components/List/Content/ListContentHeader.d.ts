import { CancelToken } from 'axios';
import { Location } from 'history';
import React from 'react';
import { PathMatch } from 'react-router-dom';
import EntityService, { EntityValues } from '../../../services/entity/EntityService';
interface ListContentProps {
    path: string;
    entityService: EntityService;
    ignoreColumn: string | undefined;
    preloadData: boolean;
    cancelToken: CancelToken;
    match: PathMatch;
    location: Location<Record<string, string> | undefined>;
    selectedValues: string[];
    parentRow: EntityValues | undefined;
    mobile?: boolean;
}
declare const _default: React.ForwardRefExoticComponent<ListContentProps & React.RefAttributes<any>>;
export default _default;
