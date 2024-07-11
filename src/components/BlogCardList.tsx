import * as React from 'react'

import BlogCard from '@components/BlogCard'
import type { CollectionEntry } from "astro:content"
import { getQueryString, changeURLArg } from "@utils/urlUtil"
import { getPagination } from "@utils/postsUtil"
import { iLog } from '@utils/iLogUtil'
import { allMdArr } from "@utils/astroUtil"

function getPosts(): CollectionEntry<"blog">[] {
    return allMdArr.filter(md => md.data.class === '技术')
				.sort((p1, p2) => p2.data.pubDate.getTime() - p1.data.pubDate.getTime())
}

// 评论组件
const id = 'blogs-list'

const BlogCardList = () => {
    
    const [mounted, setMounted] = React.useState(false)
    const [page, setPage] = React.useState("1")
    const [collection, setCollection] = React.useState(getPosts())
    const [totalPages, setTotalPages] = React.useState(1)
    
    React.useEffect(() => {
        setMounted(true)
        setPage(getQueryString('page') === '' ? "1" : getQueryString('page'))
        if (page === "1") {
            const { totalPages, paginatedPosts } = getPagination({
                posts: getPosts(), page: 1, isIndex: false
            })
            setCollection(paginatedPosts)
            setTotalPages(totalPages)
        }
        if (Number(page) > totalPages) {
            setPage(totalPages.toString())
        }
    }, [])

    React.useEffect(() => {
        if (page !== "1") {

            if (Number(page) > totalPages) {
                setPage(totalPages.toString())
                return 
            }

            const { paginatedPosts } = getPagination({
                posts: getPosts(), page: page, isIndex: false
            })
            setCollection(paginatedPosts)
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
            <div>总页数: { totalPages }, 当前页码: { page }</div>
        </div>
    )
}

export default BlogCardList