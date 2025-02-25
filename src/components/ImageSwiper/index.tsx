import * as React from 'react'

import './ImageSwiper.min.css'
import type { imageType } from '@type/common';

const id = 'image-swiper'

const ImageSwiper = ({images} : { images: imageType[] }) => {
    
    const [mounted, setMounted] = React.useState(false);
    const [desc, setDesc] = React.useState('');
    // const [currentImage, setCurrentImage] = React.useState<imageType>();
    const [currentIdx, setCurrentIdx] = React.useState(0);

    React.useEffect(() => {
        setMounted(true)
        // setCurrentImage(images[currentIdx]);
    }, [])

    return (
        images.length > 0 && (
            <div className='swiper-cont'>
                <div className="swiper-imgbox">
                    <img src={images[currentIdx]?.src} alt={images[currentIdx]?.title} />
                </div>
                <div className="image-title">{currentIdx+1} - {images[currentIdx]?.title}</div>
            </div>
        )
        
    )
}


export default ImageSwiper