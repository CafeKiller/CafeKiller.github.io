import type { BooleanString, Repo } from "@giscus/react";
// import type { Site } from "@types/index";

export type GiscusType = {
    repo: Repo,
    repoId: string,
    categoryId: string,
    showTopReactions: BooleanString,
    lang: string,
}

export const SITE = {
    website: 'https://CafeKiller.github.io',
    author: 'Coffee_Killer',
    desc: '浩瀚星空为我梦, 星辰大海任我游, 这是我的一方小天地, 隐匿在数据海洋的一处角落, 此处珍藏着我的成长与故事, 愿我能不断创作与进步, 成为一个有趣的人.',
    title: ' - CafeBlogs',
    ogImage: '//testingcf.jsdelivr.net/gh/cafekiller/cafe.cdn/images/header.jpg',
    lightAndDarkMode: true,
    webPrefix: '',
    githubAccount: 'CafeKiller',
    repoName: 'CafeKiller.github.io',
    cover: '//testingcf.jsdelivr.net/gh/cafekiller/cafe.cdn/images/header.jpg',
}

export const LOCALE = {
    lang: "zh",
    langTag: ["zh-CN"],
} as const
  
export const GISCUS_CONF : GiscusType = {
    repo: `${SITE.githubAccount}/${SITE.repoName}`,
    repoId: "R_kgDOMKfLMQ",
    categoryId: "DIC_kwDOMKfLMc4CgsOf",
    showTopReactions: "0",
    lang: "zh-CN",
}

export enum IMAGE_CDN_PREFIX {
    JSD = '//testingcf.jsdelivr.net/gh/cafekiller/cafe.cdn',
    QNiu = '',
}