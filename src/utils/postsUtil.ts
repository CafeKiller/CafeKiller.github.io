import { SITE } from "@config"

import type { GetPaginationProps } from "@type/common"

export const getPageNumbers = (numberOfPosts: number, postPerPage: number) => {
    
    const numberOfPages = Math.ceil(numberOfPosts / postPerPage)
    let pageNumbers: number[] = []
    
    for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
        pageNumbers = [...pageNumbers, i]
    }
    return pageNumbers
}


export const getPagination = <T>({ posts, page, isIndex=false}: GetPaginationProps<T[]>, postPerPage: number = SITE.postPerPage) => {
    // console.log(postPerPage);
    const totalPagesArray = getPageNumbers( posts.length, postPerPage)
    const totalPages = totalPagesArray.length
    const currentPage = isIndex 
                        ? 1 : // 如果是索引页直接返回第1页
                        (page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))) 
                            ? Number(page)  // 当page参数有效时返回数字化的页码
                            : 0 // 无效参数时返回0表示错误

    const lastPost = isIndex ? postPerPage : currentPage * postPerPage
    const startPost = isIndex ? 0 : lastPost - postPerPage
    const paginatedPosts = posts.slice(startPost, lastPost)

    return {
        totalPages,
        currentPage,
        paginatedPosts,
    }
}