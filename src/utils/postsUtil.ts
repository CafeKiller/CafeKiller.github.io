import { SITE } from "@config"

interface GetPaginationProps<T> {
    posts: T 
    page: number | string 
    isIndex?: boolean 
}

export const getPageNumbers = (numberOfPosts: number) => {
    const numberOfPages = Math.ceil(numberOfPosts / SITE.postPerPage)

    let pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
        pageNumbers = [...pageNumbers, i]
    }

    return pageNumbers
}


export const getPagination = <T>({ posts, page, isIndex=false}: GetPaginationProps<T[]>) => {

    const totalPagesArray = getPageNumbers( posts.length )

    const totalPages = totalPagesArray.length
    
    const currentPage = isIndex 
                        ? 1 : 
                        (page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))) 
                            ? Number(page) 
                            : 0

    const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage
    
    const startPost = isIndex ? 0 : lastPost - SITE.postPerPage

    const paginatedPosts = posts.slice(startPost, lastPost)

    return {
        totalPages,
        currentPage,
        paginatedPosts,
    }
}