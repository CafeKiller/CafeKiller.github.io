import type { MarkdownHeading } from "astro"
import React from "react"

import "@styles/markdown.scss"

const id = "Catalogs"
const Catalogs = ( {headings, isTop}: {headings: MarkdownHeading[], isTop?: boolean} ) => {

    const [mounted, setMounted] = React.useState(false)

    const getHeaderSymbol = (depth: number) => {
        return '#'.repeat(depth)
    }

    // 新增滚动到顶部函数
    const handleScrollTop = (e: React.MouseEvent) => {
        e.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }

    // 新增：监听header离开视口的逻辑
    React.useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <div className={ `catalogs-wrapper ${isTop ? "top" : 'bottom'}` }>
            {
                headings.map(head => {
                    return (
                        <a key={head.slug} 
                            className={ `catalog-link level${head.depth}` } 
                            href={`#${head.slug}`}
                            >  { getHeaderSymbol(head.depth) +" " + head.text } </a>
                    )
                })
            }
            { isTop ? '' : (<a className="catalog-link" href="javascript:void(0)" onClick={ handleScrollTop }> ↑ 回到顶部</a>) }
            { isTop ? '' : (<a className="mobile-btn" href="javascript:void(0)"></a>)}
        </div>
    )

}

export default Catalogs