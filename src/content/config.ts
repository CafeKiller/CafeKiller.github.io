// 从 `astro:content` 导入辅助工具
import { SITE } from "@config"
import { z, defineCollection } from "astro:content"


const BASE_SCHEMA = {
    title: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
    author: z.string().default(SITE.author),
}


// 为每一个集合定义一个 `type` 和 `schema`
const baseCollection = defineCollection({
    type: 'content',
    schema: z.object({
        ...BASE_SCHEMA,
        updatedDate: z.date().optional(), // 最后更新时间
        description: z.string().optional(), // 文章描述
        featured: z.boolean().optional(), // 是否为推荐文章
        image: z.object({
            url: z.string(),
            alt: z.string()
        }).optional(), // 封面图片
        tags: z.array(z.string()), // 相关标签
    })
})

// 短篇笔记
const noteCollection = defineCollection({
    type: "content",
    schema: z.object({
        ...BASE_SCHEMA,
        image: z.object({
            url: z.string(),
            alt: z.string(),
        }).optional(), // 封面图片
        tags: z.array(z.string()), // 相关标签
        images: z.array(z.object({
            src: z.string().optional(),
            title: z.string().optional(),
            desc: z.string().optional(),
        })).optional(), // 相关图片
        openComm: z.boolean().default(true), // 是否开启评论
        imgWrapper: z.enum(['BOX','SWIPER']).default('BOX'), // 图片展示方式
    })
})

// 导出一个单独的 `collections` 对象来注册你的集合
export const collections = {
    "posts": baseCollection,
    "posts_re": baseCollection,
    "articles": baseCollection,
    "notes": noteCollection,
}