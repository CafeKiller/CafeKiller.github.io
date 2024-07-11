import { SITE } from "@config"

interface GetPaginationProps<T> {
    posts: T // 文章集合
    page: number | string // 当前页码
    isIndex?: boolean // 是否为首页
}

// 根据文章总数获取页码
const getPageNumbers = (numberOfPosts: number) => {
    const numberOfPages = Math.ceil(numberOfPosts / SITE.postPerPage)

    let pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
        pageNumbers = [...pageNumbers, i]
    }

    return pageNumbers
}

// 获取分页
const getPagination = <T>({ posts, page, isIndex=false}: GetPaginationProps<T[]>) => {

    const totalPagesArray = getPageNumbers( posts.length )

    const totalPages = totalPagesArray.length

    // 获取当前页码
    const currentPage = isIndex 
                        ? 1 : 
                        (page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))) 
                            ? Number(page) 
                            : 0
    console.log("currentPage",currentPage);
    
    // 最后一页文章的索引 
    const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage
    console.log("lastPost",lastPost);
    
    // 开始文章的索引 
    const startPost = isIndex ? 0 : lastPost - SITE.postPerPage
    console.log("startPost", startPost);

    // 分页后的文章集合
    const paginatedPosts = posts.slice(startPost, lastPost)

    return {
        totalPages,
        currentPage,
        paginatedPosts,
    }
}

export {
    getPageNumbers,
    getPagination,
}