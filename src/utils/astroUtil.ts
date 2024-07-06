import { getCollection } from 'astro:content'
import { formatDate } from './dateUtil'
import { postFilter } from './filterUtil'
import type { CollectionEntry } from "astro:content"

type navType = {
	url: string
	title: string
	date: Date
}

type yearType = {
	[key: string]: Array<navType>
}

type tagType = {
	tag: string,
	count: number
}
 
const createAllMd = async () => {
	let _array: CollectionEntry<'blog'>[] = []
	return _array.concat(await getCollection('blog'))
				 .filter(blog => !blog.data.draft)
}

const allMdArr = await createAllMd()

// 整合文章中的所有年份
const years: Array<number> = [...new Set(allMdArr.map((md) => parseInt(formatDate(md.data.pubDate).slice(0,4))).flat())]
							.sort((y1, y2) => y2 - y1)

// 根据年份, 生成文章历史记录
const createYearHistories = () : yearType => {

	const _obj: yearType = {}

	years.forEach((year) => {
		
		const _arr: Array<navType> = []
		
		allMdArr.forEach((md) => {
			if (formatDate(md.data.pubDate).slice(0,4) === year.toString()) {
				_arr.push({
					url: `/${md.collection}/${md.slug}`,
					title: md.data.title,
					date: md.data.pubDate
				})
			}
		})
		_arr.sort((md1, md2) => md2.date.getTime() - md1.date.getTime())
		_obj[year] = _arr
	})
	return _obj
}

// 获取所用文章的 Tag, 整合成 Tag名称+Tag文章数量 的数组
const getUniqueTags = (posts: CollectionEntry<'blog'>[]) : Array<tagType> => {
	
	// 获取唯一tag数组
	const tags: Array<string> = [...new Set(posts.map((md) => md.data.tags).flat())]

	// 
	const uniqueTags: Array<tagType> =  tags.map((tag) => {    
				const filteredMds = posts.filter((md) => md.data.tags.includes(tag))
				return {
					tag:  tag ,
					count: filteredMds.length,
				}
			})
			// 进行排序, 数量多的排前面
			.sort((tag1, tag2) => tag2.count - tag1.count)
			// 使用英文优先级进行排序
			.sort((tag1, tag2) => {
				if (tag1.tag.toLowerCase() < tag2.tag.toLowerCase()) {
					return -1
				}
				if (tag1.tag.toLowerCase() > tag2.tag.toLowerCase()) {
					return 1
				}
				return 0
			})

	return uniqueTags
}

export {
	allMdArr,
	years,
	createYearHistories,
	getUniqueTags,
}