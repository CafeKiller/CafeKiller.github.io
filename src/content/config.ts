// 从 `astro:content` 导入辅助工具
import { SITE } from "@config"
import { z, defineCollection } from "astro:content"

// 为每一个集合定义一个 `type` 和 `schema`
const baseCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(), // 文章标题
        pubDate: z.date(), // 发布时间
        description: z.string().optional(), // 文章描述
        author: z.string().default(SITE.author), // 文章作者
        featured: z.boolean().optional(), // 是否为推荐文章
        draft: z.boolean().default(false), // 是否为草稿
        image: z.object({
            url: z.string(),
            alt: z.string()
        }).optional(), // 封面图片
        tags: z.array(z.string()), // 相关标签
        class: z.enum(['技术','杂谈','游戏']).default('技术') // 分类
    })
})

// 短篇笔记
const noteCollection = defineCollection({
    type: "content",
    schema: z.object({
        title: z.string(), 
        pubDate: z.date(),
        draft: z.boolean().default(false), // 是否为草稿
        image: z.object({
            url: z.string(),
            alt: z.string(),
        }).optional(), // 封面图片
        tags: z.array(z.string()), // 相关标签
    })
})

// 导出一个单独的 `collections` 对象来注册你的集合
export const collections = {
    blog: baseCollection,
    posts: baseCollection,
    games: baseCollection,
    articles: baseCollection,
    notes: noteCollection,
}