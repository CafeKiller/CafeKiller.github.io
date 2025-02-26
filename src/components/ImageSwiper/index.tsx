import * as React from 'react'

import './ImageSwiper.min.css'
import type { imageType } from '@type/common';

const id = 'image-swiper'

const ImageSwiper = ({images} : { images: imageType[] }) => {
    
    const [currentIdx, setCurrentIdx] = React.useState(0);

    const prveImage = () => {
        currentIdx == 0 ? setCurrentIdx(images.length - 1) : setCurrentIdx(currentIdx - 1);
    }
    const nextImage = () => {
        currentIdx == images.length - 1 ? setCurrentIdx(0) : setCurrentIdx(currentIdx + 1);
    }

    React.useEffect(() => {
    }, [currentIdx])

    return (
        images.length > 0 && (
            <div className='swiper-cont'>
                <p className='tips'>点击图片可以查看原图</p>
                <div className="swiper-imgbox">
                    <img 
                        src={images[currentIdx]?.src} 
                        alt={images[currentIdx]?.title} 
                        onClick={ () => { window.open(images[currentIdx]?.src, "_blank")} }/>
                </div>
                <div className="image-title">{ images[currentIdx]?.title }</div>
                <button className='swiper-btn prve' onClick={ () => { prveImage() } }> ← </button>
                <button className='swiper-btn next' onClick={ () => { nextImage() } }> → </button>
            </div>
        )
        
    )
}


export default ImageSwiper