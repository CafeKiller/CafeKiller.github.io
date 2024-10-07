import { useEffect, useRef, useState } from 'react'

import { getQueryString, changeURLArg } from "@utils/urlUtil"

import '@styles/global.min.css'
import '@styles/searchBar.min.css'


// 文章搜索组件
const id = 'search-bar'

const SearchBar = () => {

    const inputRef = useRef<HTMLInputElement>(null);
    const [inputVal, setInputVal] = useState<string>("");

    // 获取 input 的当前值
    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputVal(e.currentTarget.value)
    }

    useEffect(() => {
        const _query = getQueryString('q')
        if (_query) {
            setInputVal(_query)
            inputRef.current?.focus()
        }
    },[])

    useEffect(() => {
        
        // 同步至 URL 参数
        if(inputVal.length > 0) {
            const _url = changeURLArg(window.location.href, 'q', inputVal);
            window.history.pushState({}, '', _url)
        } else {
            history.replaceState(history.state, "", window.location.pathname);
        }
    })

    return (
        <div className='search-bar'>
            <input 
                id={id} 
                type="text"  
                ref = {inputRef}
                value = {inputVal}
                onChange={handleInputChange} 
                placeholder="请输入你需要搜索文章的关键字" />
        </div>
    )
}

export default SearchBar