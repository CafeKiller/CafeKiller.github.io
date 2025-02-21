import * as React from 'react'

import type { CollectionEntry } from "astro:content"
import { formatDate } from '@utils/commonUtil'

import './blogCard.min.css'

const id = 'blog-card'


const BlogCard = ({post}: {post: CollectionEntry<'posts'> | CollectionEntry<'articles'>}) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [desc, setDesc] = React.useState('')
    // const [borderLen, setBorderLen] = React.useState("0")

    React.useEffect(() => {
        setMounted(true)
        
        const _desc = post.body.replace(/\s*/g,"")
                    .replace(/(\*\*|__|\$\$|\$\)|`|~~|==|{|}|##+|#+|==+|>+|-+|\\(|\\)|\\[|\\]|\\{|\\})/g,"")
                    .slice(0,71)
        setDesc(_desc)

        // const borderLen = (Math.random() * (77-33)+33).toFixed(2)
        // setBorderLen(borderLen + "%")
    }, [])

    return (
        <a className="post-card-box"    
            // style={{"--border-len": borderLen } as React.CSSProperties }
            href={`/${post.collection}/${post.slug}`} >
            <div className="post-card">
                <span className="time">{ formatDate( post.data.pubDate ).slice(0,10) }</span>
                <h1 className="title">{ post.data.title }</h1>
                <p className="description">
                    { desc + '......'}
                </p>
                {/* <ul className="tags">
                    {
                        post.data.tags.map((tag, index) => {
                            return <li key={index}><span>#</span>{tag}</li>
                        })
                    }
                </ul> */}
            </div>
        </a>
    )
}


export default BlogCard