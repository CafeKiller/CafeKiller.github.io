import { useEffect, useMemo, useRef, useState } from 'react'
import Fuse from 'fuse.js';

import type { CollectionEntry } from 'astro:content';

import { changeURLArg } from "@utils/urlUtil"
import { allMdArr } from '@utils/astroUtil';

import '@styles/global.min.css'
import '@styles/searchBar.min.css'

export type SearchItem = {
    title: string;
    description: string;
    body: string;
    slug: string;
};

interface SearchResult {
    item: SearchItem;
    refIndex: number;
}

const searchList = allMdArr.map(({ data, slug, body }): SearchItem => ({
    title: data.title,
    description: data.description ? data.description : "",
    body: body,
    slug,
}));


// 文章搜索组件
const id = 'search-bar'

const SearchBar = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputVal, setInputVal] = useState<string>("");
    const [searchResults, setSearchResults] = useState<SearchResult[] | null>( null );


    // 获取 input 的当前值
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputVal(e.currentTarget.value)
    }

    const fuse = useMemo(
        () =>
            new Fuse(searchList, {
                keys: ["title", "description"],
                includeMatches: true,
                minMatchCharLength: 2,
                threshold: 0.5,
            }),
        [searchList]
    );

    useEffect(() => {
        const url = new URL(window.location.href)
        const _query = url.searchParams.get('q')
        if (_query) { 
            setInputVal(_query)
            inputRef.current?.focus()
        }
    },[])

    useEffect(() => {
        let inputResult = inputVal.length > 1 ? fuse.search(inputVal) : [];
        setSearchResults(inputResult);

        // 同步至 URL 参数
        if(inputVal.length >= 0) {
            const _url = changeURLArg(window.location.href, 'q', inputVal);
            window.history.pushState({}, '', _url)
        } else {
            const { search } = window.location;
            history.replaceState(history.state, "", `${window.location.pathname}${search}`);
        }
    }, [inputVal])

    return (
        <div className='search-bar'>
            <input 
                id={id} 
                type="text"  
                ref = {inputRef}
                value = {inputVal}
                onChange={handleInputChange} 
                placeholder="请输入你需要搜索文章的关键字" />
            
            <ul>
            {
                // searchResults && 
                //     searchResults.map(() => {
                //         return (
                //             <li></li>
                //         )
                //     })
            }    
            </ul>       
        </div>
    )
}

export default SearchBar