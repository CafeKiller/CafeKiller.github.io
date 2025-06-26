import * as React from 'react'
import Giscus from '@giscus/react'
import { GISCUS_CONF, type GiscusType } from '@config'
import { themeValue } from '@utils/themeUtil'

// 评论组件
const id = 'giscus-comment'

const getBlogTheme = () => {
    return document.body.getAttribute('data-theme') || 'light'
}

function sendMessage(message: Object) {
    const iframe = document.querySelector("giscus-widget")?.shadowRoot?.querySelector("iframe");
    if (!iframe || !iframe.contentWindow) return;
    iframe.contentWindow.postMessage({ giscus: message }, "https://giscus.app");
}

const Comments = ({ options } : { options?: GiscusType}) => {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState('light')

    React.useEffect(() => {
        let _theme: string = getBlogTheme() || themeValue
        setTheme(_theme)
        // 监听主题变化
        const observer = new MutationObserver(() => {
            _theme = getBlogTheme() || themeValue
            setTheme(_theme)
            sendMessage({
                setConfig: { theme: _theme },
            });
        })
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['data-theme']
        })
        // 取消监听
        return () => {
            // observer.disconnect()
        }
    }, [])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id={id} className='comment-wrapper'>
            <div className='iLine'></div>
            { 
                mounted
                // 注册 giscus 信息
                && <Giscus 
                    id={id}
                    repo= {  options?.repo || GISCUS_CONF.repo  }
                    repoId= {  options?.repoId || GISCUS_CONF.repoId }
                    category='General'
                    categoryId= { options?.categoryId || GISCUS_CONF.categoryId }
                    mapping='title'
                    reactionsEnabled= { options?.showTopReactions || GISCUS_CONF.showTopReactions }
                    emitMetadata='0'
                    inputPosition='bottom'
                    lang={ options?.lang || GISCUS_CONF.lang }
                    theme={ theme || themeValue }
                    loading='lazy'
                /> 
            }
        </div>
    )
}

export default Comments