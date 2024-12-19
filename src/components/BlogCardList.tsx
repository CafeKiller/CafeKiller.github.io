import * as React from 'react'

import BlogCard from '@components/BlogCard'
import Paginator from '@components/Paginator'
import type { CollectionEntry } from "astro:content"
import { getQueryString, changeURLArg } from "@utils/urlUtil"
import { getPagination } from "@utils/postsUtil"

import '@styles/global.min.css'
import { EventType } from '@type/event'

function getPosts(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
    return posts.filter(md => md.data.class === '技术')
				.sort((p1, p2) => p2.data.pubDate.getTime() - p1.data.pubDate.getTime())
}



// 评论组件
const id = 'blogs-list'

const BlogCardList = ({ posts } : {posts: CollectionEntry<'posts'>[]}) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [page, setPage] = React.useState("1")
    const [collection, setCollection] = React.useState(getPosts(posts))
    const [totalPages, setTotalPages] = React.useState(1)
    
    React.useEffect(() => {

        setMounted(true)
        
        const _query = (getQueryString('page') === '' || Number(getQueryString('page')) <= 0) 
                        ? "1" : getQueryString('page')
        setPage(_query)

        if (page === "1") {
            const { totalPages, paginatedPosts } = getPagination({
                posts: getPosts(posts), page: 1, isIndex: false
            })
            setCollection(paginatedPosts)
            setTotalPages(totalPages)
        }
        if (Number(page) > totalPages) {
            setPage(totalPages.toString())
        } 

        document.addEventListener(EventType.URL_QUERY_CHANGE, function(event) {
            const detail = (event as CustomEvent).detail;
            if(detail && detail.page) {
                setPage(detail.page)
            }
        });
    }, [])

    React.useEffect(() => {
        console.log("BlogCardList.setPage ====>>  ");
        if (page !== "1") {
            if (Number(page) > totalPages) {
                setPage(totalPages.toString())
                return 
            }
            const { paginatedPosts } = getPagination({
                posts: getPosts(posts), page: page, isIndex: false
            })
            setCollection(paginatedPosts)
            const _url = changeURLArg(window.location.href, 'page', page)
            window.history.pushState({}, '', _url)
        }
    }, [page])

    React.useEffect(() => {
        console.log("BlogCardList.setCollection ====>>  ");
    },[collection])



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
            <Paginator totalPages={totalPages} />
        </div>
    )
}

export default BlogCardList