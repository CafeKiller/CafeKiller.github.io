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