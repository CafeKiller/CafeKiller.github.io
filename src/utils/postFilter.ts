
import type { CollectionEntry } from "astro:content"

// 默认过滤处理函数, 用于处理标记为草稿的博客文章
const postFilter = ( {data}: CollectionEntry<"posts">) => {
    const isPublishTimePassed = Date.now() > new Date(data.pubDate).getTime()
    return !data.draft && (import.meta.env.DEV || isPublishTimePassed)
}

export default postFilter