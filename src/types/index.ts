export type Site = {
    website: string
    author: string
    desc: string
    title: string
    ogImage?: string
    lightAndDarkMode: boolean
    postPerPage: number,
    webPrefix: string,
    githubAccount?: string,
    repoName?: string,
}
  

export type SocialObjects = {
    color: string
    href: string
    active: boolean
    linkTitle: string
}[]