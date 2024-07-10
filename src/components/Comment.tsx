import * as React from 'react'
import Giscus from '@giscus/react'

// 评论组件
const id = 'giscus-comment'

const getPreferTheme = () => {
    if (localStorage) {
        return localStorage.getItem("__cafe-blog_theme")
    }
    return ''
}

const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const getBlogTheme = () => {
    return document.body.getAttribute('data-theme') || 'light'
}

const Comments = () => {
    const [mounted, setMounted] = React.useState(false)
    const [theme, setTheme] = React.useState('light')

    React.useEffect(() => {
        const _theme =  getBlogTheme() || getPreferTheme() || getSystemTheme()
        setTheme(_theme)
        // 监听主题变化
        const observer = new MutationObserver(() => {
            setTheme(_theme)
        })
        observer.observe(document.body, { 
            attributes: true, 
            attributeFilter: ['data-theme']
        })

        // 取消监听
        return () => {
            observer.disconnect()
        }
    }, [])

    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div id={id} className='comment-cont'>
            { 
                mounted 
                && <Giscus 
                    id={id}
                    repo="CafeKiller/MyBlog"
                    repoId='R_kgDOMKfLMQ'
                    category='Announcements'
                    categoryId='DIC_kwDOMKfLMc4CgsOf'
                    mapping='title'
                    reactionsEnabled='1'
                    emitMetadata='0'
                    inputPosition='bottom'
                    lang={'zh-CN'}
                    theme={ theme }
                    loading='lazy'
                /> 
            }
        </div>
    )

}


export default Comments


/*
<script src="https://giscus.app/client.js"
        data-repo="CafeKiller/MyBlog"
        data-repo-id="R_kgDOMKfLMQ"
        data-category="Announcements"
        data-category-id="DIC_kwDOMKfLMc4CgsOf"
        data-mapping="title"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="0"
        data-input-position="top"
        data-theme="preferred_color_scheme"
        data-lang="zh-CN"
        data-loading="lazy"
        crossorigin="anonymous"
        async>
</script>
*/ 

