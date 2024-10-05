import * as React from 'react'

import '@styles/global.min.css'


// 文章搜索组件
const id = 'search-bar'

const SearchBar = () => {

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        console.log(e.currentTarget.value)
    }

    return (
        <div className='search-bar'>
            <input id={id} type="text" onChange={handleInputChange} placeholder="搜索文章" />
        </div>
    )
}

export default SearchBar