import * as React from 'react'

import QMessage from '@utils/msgUtil.ts'
import { getQueryString, changeURLArg } from "@utils/commonUtil"
import { urlChangeEvent } from '@utils/eventUtil.ts'

import '@styles/global.min.css'
import './paginator.min.css'




const Paginator = ({totalPages } : { totalPages: number }) => {
    
    const [mounted, setMounted] = React.useState(false)
    const [currentPage, setCurrentPage] = React.useState("0")
    
    const handleChangePage =  (page: number) => {
        let _url = ''
        if (page <= 0) {
            // _url = changeURLArg(window.location.href, 'page', "1")
            QMessage.warning('已经是第一页了')
            return
        } else if (page > totalPages) {
            // _url = changeURLArg(window.location.href, 'page', totalPages)
            QMessage.warning('已经是最后一页了')
            return
        } else {
            _url = changeURLArg(window.location.href, 'page', page)
            setCurrentPage(page.toString())
            document.dispatchEvent(urlChangeEvent({page : page}));
        }
        window.history.pushState({}, '', _url);
        
        // 滚动回页面顶部
        const targetElem = document.querySelector("#blogs-list") as HTMLElement;
        if (window.scrollY > 0) {
            if (targetElem) {
                window.scrollTo({
                    top: targetElem.offsetTop - 100,
                    behavior: 'smooth',
                })
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            }
        }
    }

    React.useEffect(() => {
        const _query =  (getQueryString('page') === '' || Number(getQueryString('page')) <= 0)  
            ? "1" : getQueryString('page')
        if (Number(_query) > totalPages) {
            setCurrentPage(totalPages.toString())
            // document.dispatchEvent(urlChangeEvent);
            document.dispatchEvent(urlChangeEvent({page : _query}));
        } else {
            setCurrentPage(_query)
            // document.dispatchEvent(urlChangeEvent);
            document.dispatchEvent(urlChangeEvent({page : _query}));
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