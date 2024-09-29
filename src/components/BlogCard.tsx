import * as React from 'react'

import type { CollectionEntry } from "astro:content"
import { formatDate } from '@utils/dateUtil'

import '@styles/blogCard.min.css'

const id = 'blog-card'


const BlogCard = ({post}: {post: CollectionEntry<'blog'>}) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [desc, setDesc] = React.useState('')
    const [borderLen, setBorderLen] = React.useState("0")

    React.useEffect(() => {
        setMounted(true)
        
        const _desc = post.body.replace(/\s*/g,"") // 过滤空格
                    .replace(/(\*\*|__|\$\$|\$\)|`|~~|==|{|}|##+|#+|==+|>+|-+|\\(|\\)|\\[|\\]|\\{|\\})/g,"") // 过滤markdown格式化字符
                    .slice(0,151)
        setDesc(_desc)

        const borderLen = (Math.random() * (77-33)+33).toFixed(2)
        setBorderLen(borderLen + "%")
    }, [])

    return (
        <a className="post-card-box" href={`/${post.collection}/${post.slug}`} style={{"--border-len": borderLen } as React.CSSProperties }>
            <div className="post-card">
                <span className="time">{ formatDate( post.data.pubDate ).slice(0,10) }</span>
                <h1 className="title">{ post.data.title }</h1>
                <p className="description">
                    { desc + '......'}
                </p>
            </div>
        </a>
    )
}


export default BlogCard