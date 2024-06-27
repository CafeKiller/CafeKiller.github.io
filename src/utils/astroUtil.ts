import { getCollection } from 'astro:content'

const createAllMd = async () => {
	let _array:Array<any> = []

	return _array.concat(await getCollection('posts'))
				.concat(await getCollection('games'))
				.concat(await getCollection('articles'))
}

export const allPosts = await createAllMd()