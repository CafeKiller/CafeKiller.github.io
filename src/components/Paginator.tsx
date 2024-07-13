import * as React from 'react'

import { getQueryString, changeURLArg } from "@utils/urlUtil"

import '@styles/global.min.css'
import '@styles/Paginator.min.css'

const Paginator = ({totalPages } : { totalPages: number }) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState("0")
    
    const handleChangePage =  (page: number) => {
        let _url = ''
        if (page <= 0) {
            _url = changeURLArg(window.location.href, 'page', "1")
            return
        } else if (page > totalPages) {
            _url = changeURLArg(window.location.href, 'page', totalPages)
            return
        } else {
            _url = changeURLArg(window.location.href, 'page', page)
        }

        window.history.pushState({}, '', _url)
        window.location.reload()
    }

    React.useEffect(() => {
        const _query =  (getQueryString('page') === '' || Number(getQueryString('page')) <= 0)  
            ? "1" : getQueryString('page')
        if (Number(_query) > totalPages) {
            setCurrentPage(totalPages.toString())
        } else {
            setCurrentPage(_query)
        }
    }, [totalPages])

    React.useEffect(() => {
        setMounted(true)
    }, [])


    return (
        mounted && (
            <nav className='page-contr'>
                <button 
                    className={`contr-btn ${ Number(currentPage) === 1 ? 'disabled' : ''}`} 
                    onClick={() => handleChangePage(Number(currentPage) - 1)}>
                        Prev
                </button>

                <div className='contr-center'>{currentPage} / {totalPages}</div>
                
                <button 
                    className={`contr-btn  ${ Number(currentPage) === totalPages ? 'disabled' : '' }`} 
                    onClick={() => handleChangePage(Number(currentPage) + 1)}>
                        Next
                </button>
            </nav>
        )
    )

}

export default Paginator