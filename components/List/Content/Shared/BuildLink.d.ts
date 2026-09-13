interface buildLinkProps {
    link: string;
    id?: string;
    params: Record<string, unknown>;
}
declare const buildLink: (props: buildLinkProps) => string;
export default buildLink;
