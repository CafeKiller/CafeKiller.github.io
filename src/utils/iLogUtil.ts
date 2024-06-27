type iLogOptType = {
    [property: string] : {
        defaTitle: string,
        color: string
    }
}

type iLogObj = {
    
    [property: string] : Function 
}

function ILog(options?: iLogOptType) {

    const config = Object.assign({
        info: { defaTitle:'Info', color:'#909399'},
        error: { defaTitle:'Error', color:'#F56C6C'},
        warning: { defaTitle:'Warning', color:'#E6A23C'},
        success: { defaTitle:'Success', color:'#67C23A'},
    }, options)

    const isEmpty = (value: string) => {
        return value == null || value === undefined || value === ''
    }

    const myPrint = (title: string, text: string, color: string) => {
        console.log(
            `%c ${title} %c ${text} %c`,
            `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
            `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
            'background:transparent'
        )
    }

    return (() => {
        const _obj: iLogObj = {}
        Object.keys(config).forEach( key => {
            Object.defineProperty(_obj, key, {
                value: (textOrTitle: string, content = '') => {
                    const title = isEmpty(content) ? config[key].defaTitle : textOrTitle
                    const text = isEmpty(content) ? textOrTitle : content
                    myPrint(title, text, config[key].color)
                }
            })
        })
        return _obj
    })()
}

export const log = ILog()