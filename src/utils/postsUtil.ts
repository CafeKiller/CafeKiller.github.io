import { SITE } from "@config"

interface GetPaginationProps<T> {
    posts: T // ���¼���
    page: number | string // ��ǰҳ��
    isIndex?: boolean // �Ƿ�Ϊ��ҳ
}

// ��������������ȡҳ��
const getPageNumbers = (numberOfPosts: number) => {
    const numberOfPages = Math.ceil(numberOfPosts / SITE.postPerPage)

    let pageNumbers: number[] = []

    for (let i = 1; i <= Math.ceil(numberOfPages); i++) {
        pageNumbers = [...pageNumbers, i]
    }

    return pageNumbers
}

// ��ȡ��ҳ
const getPagination = <T>({ posts, page, isIndex=false}: GetPaginationProps<T[]>) => {

    const totalPagesArray = getPageNumbers( posts.length )

    const totalPages = totalPagesArray.length

    // ��ȡ��ǰҳ��
    const currentPage = isIndex 
                        ? 1 : 
                        (page && !isNaN(Number(page)) && totalPagesArray.includes(Number(page))) 
                            ? Number(page) 
                            : 0
    console.log("currentPage",currentPage);
    
    // ���һҳ���µ����� 
    const lastPost = isIndex ? SITE.postPerPage : currentPage * SITE.postPerPage
    console.log("lastPost",lastPost);
    
    // ��ʼ���µ����� 
    const startPost = isIndex ? 0 : lastPost - SITE.postPerPage
    console.log("startPost", startPost);

    // ��ҳ������¼���
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