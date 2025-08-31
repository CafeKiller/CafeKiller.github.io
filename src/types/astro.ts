import type { CollectionEntry, InferEntrySchema } from "astro:content";

export type noteCollection = CollectionEntry<'notes'>
export type postCollection = CollectionEntry<'posts'>
export type baseCollection = postCollection

export type postSchema = InferEntrySchema<"posts">
export type noteSchema = InferEntrySchema<"notes">
export type baseSchema = postCollection



export type yearNavObj = {
    url: string,
    tit: string,
    time: Date,
    draft: boolean,
    tags: Array<string>,
}
export type yearObj = {
    [key: string]: yearNavObj[],
}



export type tagObj = {
    tag: string,
    count: number,
}