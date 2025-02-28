import { getCollection } from "astro:content";

import { PostEnum, type allCollection, type compCollection, type navType, type tagType, type yearType } from "@type/common";
import { formatDate } from "./commonUtil";


/**
 * @description 文章过滤器, 过滤掉草稿和未发布的文章
 * */
export const postFilter = ( {data}: allCollection) => {
    const isPublishTimePassed = Date.now() > new Date(data.pubDate).getTime()
    return !data.draft && (import.meta.env.DEV || isPublishTimePassed)
}

/**
 * @description 查询所有文章
 * */ 
export const queryAllPost = async () => {
	let _array: compCollection[] = []
	
	return _array.concat(await getCollection('posts'))
				 .concat(await getCollection('articles'))
                 .filter(postFilter)
}

export const queryAllMarkdown = async () => {
	let _array: allCollection[] = []
	
	return _array.concat(await getCollection('posts'))
				 .concat(await getCollection('articles'))
                 .concat(await getCollection('notes'))
                 .filter(postFilter)
}

/**
 * @description 文章数组
 * */ 
export const allPostArr: compCollection[] = await queryAllPost();


/**
 * @description 全部 Markdown 文档数组
 * */ 
export const allMarkdownArr: allCollection[] = await queryAllMarkdown();

/**
 * @description 文章年份数组
 * */ 
const years: Array<number> = [...new Set(allMarkdownArr.map((post) => parseInt(formatDate(post.data.pubDate).slice(0,4))).flat())]
                            .sort((yearBefore, yearAfter) => yearAfter - yearBefore)

/**
 * @description 根据文章发布年丰，创建文章历史记录
 * @returns { yearType }
 * */
export const createYearHistories = () : yearType => {
    const _obj: yearType = {}
    years.forEach((year) => {        
        const _arr: Array<navType> = []
        allMarkdownArr.forEach((post) => {
            if (formatDate(post.data.pubDate).slice(0,4) === year.toString()) {
                _arr.push({
                    url: `/${post.collection}/${post.slug}`,
                    title: post.data.title,
                    date: post.data.pubDate
                })
            }
        })
        _arr.sort((postBefore, postAfter) => postAfter.date.getTime() - postBefore.date.getTime())
        _obj[year] = _arr
    })
    return _obj
}                            

/**
 * @description  获取所用文章的 Tag,并整合成 Tag名称+Tag文章数量 的数组
 * */ 
//, 
export const getUniqueTags = (posts: compCollection[]) : Array<tagType> => {
    
    // 获取唯一tag数组
    const tags: Array<string> = [...new Set(posts.map((post) => {
        // if(post.data.class == PostEnum.POSTS && !post.data?.draft){
        //     return post.data.tags
        // }
        // return []
        return post.data.tags
    }).flat())]
    // console.log("getUniqueTags.tags", tags)
    const uniqueTags: Array<tagType> =  tags.map((tag) => {    
                const filteredPosts = posts.filter((post) => post.data.tags.includes(tag))
                return {
                    tag:  tag ,
                    count: filteredPosts.length,
                }
            })
            .sort((tagBef, tagAft) => { // 使用英文优先级进行排序
                if (tagBef.tag.toLowerCase() < tagAft.tag.toLowerCase()) {
                    return -1
                }
                if (tagBef.tag.toLowerCase() > tagAft.tag.toLowerCase()) {
                    return 1
                }
                return 0
            })
            .sort((tagBef, tagAft) => tagAft.count - tagBef.count)// 进行排序, 数量多的排前面
    return uniqueTags
}