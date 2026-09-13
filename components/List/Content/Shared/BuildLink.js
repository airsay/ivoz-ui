const buildLink = (props) => {
    const { params, id } = props;
    let { link } = props;
    for (const idx in params) {
        link = link.replace(`:${idx}`, params[idx]);
    }
    const urlParamNum = Object.values(params).length;
    if (id !== undefined && id !== null) {
        link = link.replace(`:parent_id_${urlParamNum + 1}`, id);
    }
    return link;
};
export default buildLink;
