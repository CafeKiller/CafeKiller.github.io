import type { baseCollection, noteCollection, tagObj, yearNavObj, yearObj } from "@type/astro"
import { getCollection } from "astro:content"
import { formatDate } from "./commonUtil"


/**
 * @description 文章时间过滤器, 过滤掉草稿和未到发布时间的文章
 * @returns { boolean }
 * */
export const mdTimeFilter = ( {data}: baseCollection | noteCollection) => {
    const isPublishTimePassed = Date.now() > new Date(data.pubDate).getTime()
    return !data.draft && (import.meta.env.DEV || isPublishTimePassed)
}


/**
 * @description 查询所有 md 文章
 * @returns { Promise }
 * */ 
export const getAllMarkdown = async (): Promise<baseCollection[]> => {
    const reuslt: baseCollection[] = []
    reuslt.concat(await getCollection('posts'))
    return reuslt
}


/**
 * @description 获取所有 note 手记
 * @returns { Promise }
 * */ 
export const getAllNotes = async ():Promise<noteCollection[]> => {
    let reuslt: noteCollection[] = []
    reuslt = await getCollection("notes")
    return reuslt
}

/**
 * @description 根据文章 slug 查询文章
 * */ 
export const selectMarkdownBySlug = async (slug: string): Promise<baseCollection> => {
    const allMarkdown = await getAllMarkdown()
    const result = allMarkdown.filter(entry => entry.slug === slug)
    return result[0]
}

/**
 * @description 根据文章 title 查询文章
 * */ 
export const selectMarkdownByTitle = async (title: string): Promise<baseCollection> => {
    const allMarkdown = await getAllMarkdown()
    const result = allMarkdown.filter(entry => entry.data.title === title)
    return result[0]
}

export const selectPostsByFeatured = async (): Promise<baseCollection[]> => {
    let reuslt: baseCollection[] = []
    reuslt = (await getCollection('posts')).filter(entry => entry.data.featured)
    return reuslt
}

/**
 * @description 查询与当前文章相临的两篇文章
*/
export const selectNearPosts = async (id: string): Promise<baseCollection[]> => {
    let result: baseCollection[] = []
    const allPosts = (await getCollection('posts'))
                    .sort((postBef, postAft) => postAft.data.pubDate.valueOf() - postBef.data.pubDate.valueOf())
    const currIdx = allPosts.findIndex(post => post.id === id)

    if (allPosts.length === 1) return result
    if (allPosts.length === 2) return result = allPosts
    if (currIdx === -1) return result

    // 判断前后文章是否存在
    if (currIdx === 0) {
        // 获取后两篇
        result = allPosts.slice(1, 3) 
    } else if (currIdx === allPosts.length - 1) {
        // 获取前两篇
        result = allPosts.slice(currIdx - 2, currIdx)
    } else {
        result.push(allPosts[currIdx - 1])
        result.push(allPosts[currIdx + 1])
    }
    return result
} 

// const ALL_MARKDOWN = await getAllMarkdown()


/**
 * @description 获取文章年份数组
 * @returns { number[] }
 * */ 
export const getMdYears = ( collection: baseCollection[] ): number[] => {
    const result = [
            ...new Set(collection.map(
                entry => parseInt(formatDate(entry.data.pubDate).slice(0, 4))
            ))
        ].sort((yBef, yAft) => yAft - yBef)

    return result
}


/**
 * @description 根据文章发布年份，创建文章年份历史记录
 * @param { baseCollection[] } collection 需要创建年份记录的文章集合
 * @returns { yearObj }
 * */
export const createYearHistories = ( collection: baseCollection[] ): yearObj => {
    const result: yearObj = {}
    getMdYears(collection).forEach((year) => {
        const _temp_result: yearNavObj[] = []
        collection.forEach((entry) => {
            if (formatDate(entry.data.pubDate).slice(0,4) === year.toString()) {
                _temp_result.push({
                    url: `/${entry.collection}/${entry.slug}`,
                    tit: entry.data.title,
                    time: entry.data.pubDate,
                    draft: entry.data.draft,
                })
            }
        })     
        _temp_result.sort((entryBef, entryAft) => entryAft.time.getTime() - entryBef.time.getTime())
        result[year] = _temp_result
    })
    return result
}


/**
 * @description 获取文章集合内的文章 tag，并整合为 { Tag, 相关文章count } 的数组
 * @param { baseCollection[] } collection 文章集合
 * @returns { tagObj[] }
 * */ 
export const getUniqueTags = ( collection: baseCollection[] ): tagObj[] => {
    let reuslt: tagObj[] = []
    const tags = [...new Set(collection.map((entry)=> entry.data?.tags).flat())]    
    reuslt = tags.map(tag => {
        const filtered = collection.filter(entry => entry.data.tags.includes(tag))
        // console.log(filtered)
        return {
            tag: tag,
            count: filtered.length
        }
    }).sort((tagBef, tagAft) => tagAft.count - tagBef.count)
    
    return reuslt
}