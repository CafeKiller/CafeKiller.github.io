function getQueryString(name: string) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    var reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
    var r = window.location.search.substr(1).match(reg)
    var q = window.location.pathname.substr(1).match(reg_rewrite)
    if (r != null) {
        return unescape(r[2])
    } else if (q != null) {
        return unescape(q[2])
    } else {
        return ''
    }
}

function changeURLArg(url:string, arg: any, arg_val:any) {
    var pattern = arg + '=([^&]*)';
    var replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        var tmp = '/(' + arg + '=)([^&]*)/gi';
        tmp = url.replace(eval(tmp), replaceText);
        return tmp;
    } else {
        if (url.match('[\?]')) {
            return url + '&' + replaceText;
        } else {
            return url + '?' + replaceText;
        }
    }
}

export {
    getQueryString,
    changeURLArg,
}