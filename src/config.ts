import type { Site } from "@type/index";

export const SITE: Site = {
    website: 'https://CafeKiller.github.io',
    author: 'Coffee_Killer',
    desc: 'A blog page built using the astro framework | 使用 astro 框架构建的博客页面',
    title: ' - CafeBlogs',
    ogImage: 'https://s21.ax1x.com/2024/07/01/pkcx1nx.png',
    lightAndDarkMode: true,
    postPerPage: 4,
    webPrefix: '',
    githubAccount: 'CafeKiller',
    repoName: 'MyBlog',
}

export const LOCALE = {
    lang: "zh",
    langTag: ["zh-CN"],
} as const
  