function getQueryString(name: string) {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const index = window.location.href.indexOf('?');
    const r = window.location.href.substr(index + 1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

export {getQueryString}