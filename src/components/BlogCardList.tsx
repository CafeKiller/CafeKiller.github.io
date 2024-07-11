import * as React from 'react'

import BlogCard from '@components/BlogCard'
import type { CollectionEntry } from "astro:content"
import { getQueryString, changeURLArg } from "@utils/urlUtil"
import { getPagination } from "@utils/postsUtil"
import { iLog } from '@utils/iLogUtil'

// 评论组件
const id = 'blogs-list'

const BlogCardList = ({ posts }: { posts: CollectionEntry<"blog">[] }) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [page, setPage] = React.useState("1")
    const [collection, setCollection] = React.useState(posts)
    
    React.useEffect(() => {
        setMounted(true)
        setPage(getQueryString('page') === '' ? "1" : getQueryString('page'))
        if (page === "1") {
            setCollection(
                getPagination({
                    posts: posts, page: 1, isIndex: false
                }).paginatedPosts
            )
        }
    }, [])

    React.useEffect(() => {
        if (page !== "1") {
            setCollection(
                getPagination({
                    posts: posts, page: page, isIndex: false
                }).paginatedPosts
            )
            const _url = changeURLArg(window.location.href, 'page', page)
            window.history.pushState({}, '', _url)
        }
    }, [page])

    return (
        <div id={id} className='blogs-list'>
            { 
                mounted 
                &&
                collection
                    .map((md) => {
                        return (<BlogCard post={md} key={md.slug}/>)
                    })
            }
        </div>
    )
}

export default BlogCardList