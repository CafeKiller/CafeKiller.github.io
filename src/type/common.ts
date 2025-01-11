import type { CollectionEntry } from "astro:content";

export type compCollection = CollectionEntry<'posts'> | CollectionEntry<'articles'>

export type tagType = {
    tag: string
    count: number
}

export type navType = {
	url: string
	title: string
	date: Date
}

export type yearType = {
	[key: string]: Array<navType>
}

export interface GetPaginationProps<T> {
    posts: T 
    page: number | string 
    isIndex?: boolean 
}