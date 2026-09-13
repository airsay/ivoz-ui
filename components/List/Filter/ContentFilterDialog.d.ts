import { CancelToken } from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { PathMatch } from 'react-router-dom';
import EntityService from '../../../services/entity/EntityService';
import { SearchFilterType } from './icons/FilterIconFactory';
export interface CriteriaFilterValue {
    name: string;
    type: SearchFilterType;
    value: string | number | boolean;
}
export declare type CriteriaFilterValues = Array<CriteriaFilterValue>;
interface ContentFilterDialogProps {
    entityService: EntityService;
    path: string;
    preloadData: boolean;
    ignoreColumn: string | undefined;
    cancelToken: CancelToken;
    match: PathMatch;
    anchorEl: null | HTMLElement;
    setAnchorEl: Dispatch<SetStateAction<null | HTMLElement>>;
}
export declare function ContentFilterDialog(props: ContentFilterDialogProps): JSX.Element | null;
export {};
