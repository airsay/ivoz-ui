/// <reference types="react" />
import { Theme } from '@mui/material';
import { HistoryTrackerLinkProps } from '../../../components/shared/HistoryTrackerLink';
export declare const ListContentStyler: ({ theme }: {
    theme: Theme;
}) => {
    display: string;
    flexDirection: string;
    gap: string;
    '& .list-content-header': {
        display: string;
        gap: string;
        justifyContent: string;
    };
    '& .buttons': {
        display: string;
        gap: string;
        alignItems: string;
        '&.start': {
            flexShrink: number;
            minWidth: number;
        };
        '&.end': {
            flexShrink: number;
        };
    };
    '.text-field': {
        width: string;
    };
    '& .input-field': {
        [x: string]: string | {
            background: string;
        };
        background: string;
        color: string;
    };
    '.filter-chips': {
        display: string;
        gap: string;
        flexShrink: string;
        overflow: string;
        paddingBottom: string;
        '&::-webkit-scrollbar': {
            height: string;
        };
        '&::-webkit-scrollbar-thumb': {
            borderRadius: string;
            background: string;
        };
        '&::-webkit-scrollbar-thumb:hover': {
            background: string;
        };
    };
    '& .card': {
        [x: string]: number | {
            paddingBlock: number;
        };
        paddingBottom: number;
    };
};
export declare const StyledListContent: import("@emotion/styled").StyledComponent<import("./ListContent").ListContentProps & import("react").RefAttributes<any> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export declare const StyledActionButtonContainer: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<Theme>, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
export declare const StyledLink: import("@emotion/styled").StyledComponent<HistoryTrackerLinkProps & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
export declare const StyledFab: import("@emotion/styled").StyledComponent<Pick<any, string | number | symbol> & import("react").RefAttributes<any> & import("@mui/system").MUIStyledCommonProps<Theme>, {}, {}>;
