import QMessage from '@utils/msgUtil.ts'
import ILog from '@utils/iLogUtil.ts'


const iLog = ILog();
const copyCodeText = (event: any) => {
    const codeElement = event.target?.closest('.astro-code').querySelector('code')

    if (codeElement) {
        const codeText = codeElement.innerText

    	const textarea = document.createElement('textarea')
    	textarea.value = codeText
    	textarea.style.position = 'fixed'
    	textarea.style.left = '-9999px'
    	// 添加到DOM
    	document.body.appendChild(textarea)
    	try {
    		// 选中并复制
    		textarea.select();
    		const success = document.execCommand('copy')
    		if (!success) {
    			if(!navigator.clipboard) {
    				QMessage.error("无法正常复制代码，请手动复制");
    				iLog.error("[WriteText] ERROR", "服务可能未部署在安全域名, navigator.clipboard 将为 undefined")
    			}
    			navigator.clipboard?.writeText(codeText)
    				.then(() => {
    					// console.log('代码已复制到剪贴板');
    					QMessage.success("成功，代码已复制到剪贴板");
    					iLog.success("[WriteText] SUCCESS", `代码已复制到剪贴板`)
    				})
    				.catch(err => {
    					QMessage.error("无法正常复制代码，请手动复制")
    					iLog.error("[WriteText] ERROR", err);
    				});
    		};
    		QMessage.success("成功，代码已复制到剪贴板");
    		iLog.success("[ExecCommand] SUCCESS", `代码已复制到剪贴板`)
    	} catch (err) {
    		QMessage.error("无法正常复制代码，请手动复制")
    		iLog.error("[ExecCommand] ERROR", err)
    	} finally {
    		// 移除临时元素
    		document.body.removeChild(textarea)
    	}
    }
}

export const createCodeLanguageTag = () => {
    const allAstroCodeDom = document.querySelectorAll('.astro-code')

    allAstroCodeDom.forEach( (astroCodeDom) => {
        const codeDom = astroCodeDom.querySelector('code')
        const newParent = document.createElement('div')
        newParent.classList.add('code-wrapper')
        codeDom && newParent.appendChild(codeDom)
        astroCodeDom.appendChild(newParent)
        
        const codeLanguage = astroCodeDom.getAttribute('data-language')
        if (codeLanguage) {
            const _span = document.createElement('span')
            _span.classList.add('code-language')
            _span.innerText = codeLanguage
            _span.addEventListener('click', copyCodeText)
            _span.setAttribute('title', '点击复制代码')
            astroCodeDom.prepend(_span)
        }
    })
}

export const titleInsertEvent = () => {
    const titles = document.querySelector(".markdown-wrapper")?.querySelectorAll("h1, h2, h3, h4, h5, h6")

	// 添加滚动监听
	const observer = new IntersectionObserver((entries) => {
    	entries.forEach(entry => {
            if (entry.isIntersecting) {
                const title = entry.target as HTMLElement
                window.location.hash = title.textContent?.trim() || title.innerHTML
            }
        })
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -50% 0px'
    })


    titles?.forEach(title => {
        // title.addEventListener("click", function() {
        //     window.location.hash = title.textContent?.trim() || title.innerHTML
        // })
		observer.observe(title)
    })
}

export const createATagJump = () => {
	const cont = document.querySelector('.markdown-wrapper')
	const allATag = cont?.querySelectorAll('a')
	allATag?.forEach( (aTag) => {
		aTag.setAttribute('target', '_blank')
	})
}

export const iamgeTagInsertEvent = () => {
	const imgTags = document.querySelectorAll('img')
	imgTags.forEach(imgTag => {
		imgTag.addEventListener("click", function() {
			const src = this.getAttribute("src")
			src && window.open(src)
		})
	})
	
}

/**
 * @description 处理目录显示逻辑，指定元素在视口内时才显示，
 * @param targetName 
 * @param domName 
 * */ 
export const dispatchCatalogShow = (targetName: string, domName: string) => {
	const target = document.querySelector(targetName)
	const dom = document.querySelector(domName)

	if(target && dom) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
					dom.setAttribute("data-show", "true")
                } else {
					dom.setAttribute("data-show", "false")
                }
            })
        })
		observer.observe(target)
	}
}