import { getCollection } from 'astro:content'
import { formatDate } from './dateUtil'

type navType = {
	url: string
	title: string
	date: Date
}

type yearType = {
	[key: string]: Array<navType>
}


const createAllMd = async () => {
	let _array:Array<any> = []
	return _array.concat(await getCollection('blog'))
				
}

const allMdArr = await createAllMd()
const years: Array<number> = [...new Set(allMdArr.map((md) => parseInt(formatDate(md.data.pubDate).slice(0,4))).flat())]
							.sort((y1, y2) => y2 - y1)

const createYearMdObj = () : yearType => {

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

export {
	allMdArr,
	years,
	createYearMdObj
}