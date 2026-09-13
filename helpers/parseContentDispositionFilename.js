export function parseContentDispositionFilename(contentDisposition) {
    var _a;
    const filenameStar = contentDisposition.match(/filename\*\s*=\s*([^']*)'([^']*)'((?:%[0-9A-Fa-f]{2}|[!#$&+\-.^_`|~\w])+)/i);
    if (filenameStar) {
        return decodeURIComponent(filenameStar[3]);
    }
    const filename = contentDisposition.match(/filename\s*=\s*(?:"([^"]*)"|([^;\s]+))/i);
    if (filename) {
        return (_a = filename[1]) !== null && _a !== void 0 ? _a : filename[2];
    }
    return 'download';
}
