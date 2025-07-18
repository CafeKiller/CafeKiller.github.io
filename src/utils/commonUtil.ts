

/**
 * @description 节流函数
 * @param func 回调函数
 * @param interval 延时
 * */
export function throttle(func: Function, interval: number, options = { leading: false, trailing: true }) {
    let timer: null | ReturnType<typeof setTimeout> = null;
    let lastTime = 0;
    const { leading, trailing } = options;
    const _throttle = function(this: unknown, ...args: any[]) {
        const nowTime = Date.now();
        if (!lastTime && !leading) lastTime = nowTime;
        const remainTime = interval - (nowTime - lastTime);
        if (remainTime <= 0) {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            lastTime = nowTime;
            func.apply(this, args);
        }
        if (trailing && !timer) {
            timer = setTimeout(() => {
                lastTime = !leading ? 0 : Date.now();
                timer = null;
                func.apply(this, args);
            }, remainTime);
        }
    };
    _throttle.cancel = function() {
        if (timer) clearTimeout(timer);
        timer = null;
        lastTime = 0;
    };
    return _throttle;
}

/**
 * @description 防抖函数
 * @param func 回调函数
 * @param delay 延时
 * */
export function debounce(func: Function, delay: number, immediate?: boolean, resultCallback?: Function) {
    let timer: null | ReturnType<typeof setTimeout> = null;
    let isInvoke = false;
    const _debounce = function(this: unknown, ...args: any[]) {
        return new Promise((resolve, reject) => {
            if (timer) clearTimeout(timer);
            if (immediate && !isInvoke) {
                try {
                    const result = func.apply(this, args);
                    if (resultCallback) resultCallback(result);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
                isInvoke = true;
            } else {
                timer = setTimeout(() => {
                    try {
                        const result = func.apply(this, args);
                        if (resultCallback) resultCallback(result);
                        resolve(result);
                    } catch (e) {
                        reject(e);
                    }
                    isInvoke = false;
                    timer = null;
                }, delay);
            }
        });
    };
    _debounce.cancel = function() {
        if (timer) clearTimeout(timer);
        isInvoke = false;
        timer = null;
    };
    return _debounce;
}

/**
 * @description 查询当前页面 URL 中的 query 参数
 * */
export function getQueryString(name: string) : string {
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const reg_rewrite = new RegExp('(^|/)' + name + '/([^/]*)(/|$)', 'i')
    const r = window.location.search.substring(1).match(reg)
    const q = window.location.pathname.substring(1).match(reg_rewrite)
    if (r != null) {
        return decodeURIComponent(r[2])
    } else if (q != null) {
        return decodeURIComponent(q[2])
    } else {
        return ''
    }
}

/**
 * @description 修改 URL 中的 query 参数
 * */ 
export function changeURLArg(url:string, arg: any, arg_val:any) : string {
    const pattern = arg + '=([^&]*)';
    const replaceText = arg + '=' + arg_val;
    if (url.match(pattern)) {
        let tmp = '/(' + arg + '=)([^&]*)/gi';
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

export function formatDate(date: Date) : string {
    const year = date.getUTCFullYear()
    const month = ('0' + (date.getUTCMonth() + 1)).slice(-2)
    const day = ('0' + date.getUTCDate()).slice(-2)
    const hours = ('0' + date.getUTCHours()).slice(-2)
    const minutes = ('0' + date.getUTCMinutes()).slice(-2)
    const seconds = ('0' + date.getUTCSeconds()).slice(-2)
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function dispatchMarkdownTime(date: Date): string {
    return formatDate(date).slice(0, 10);
}

export function isPureInteger(str: string): boolean {
    return /^[-+]?\d+$/.test(str);
}

export function dispatchMarkdownDesc(text: string, length: number = 120): string {
    const reuslt = text.replace(/\s*/g,"")
                    .replace(/(\*\*|__|\$\$|\$\)|`|~~|==|{|}|##+|#+|==+|>+|-+|\\(|\\)|\\[|\\]|\\{|\\})/g,"")
                    .slice(0,length+1);
    return reuslt;
}