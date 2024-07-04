const primaryColorScheme = "" // 预设主题色

// 获取本地存储的 主题色
const currentTheme = localStorage.getItem("__cafe-blog_theme")

/**
 * @description 获取用户设备的偏好主题色, 优先获取本地存储中的主题色,
 * 其次获取预设的主题色, 最后获取系统的偏好主题色.
 * @returns { String } 返回主题色
 * */ 
function getPreferTheme() {
    
    if (currentTheme) return currentTheme

    if (primaryColorScheme) return primaryColorScheme

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

// 获取用户设备的偏好主题
let themeValue = getPreferTheme()

// 设置偏好
function setPreference() {
    localStorage.setItem("__cafe-blog_theme", themeValue)
    reflectPreference()
}

/**
 * @description 将设置的偏好主题色响应到页面样式和结构中
 * */ 
function reflectPreference() {
    
    document.firstElementChild.setAttribute("data-theme", themeValue)
    document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue)

    if (themeValue === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    // 设置 meta 值
    const body = document.body
    if (body) {
        const computedStyles = window.getComputedStyle(body)
        const bgColor = computedStyles.backgroundColor
        document.querySelector("meta[name='theme-color']")
                ?.setAttribute("content", bgColor)
    }
}

reflectPreference()

// 设置主题切换按钮
window.onload = () => {
    function setThemeFeature() {
        // 设置初始值，以便屏幕阅读器能够获取最新的值
        reflectPreference();

        document.querySelector("#theme-btn")?.addEventListener("click", () => {
            themeValue = themeValue === "light" ? "dark" : "light"            
            setPreference()
        })
    }

    setThemeFeature()

    // "astro:after-swap" 事件用于新页面替换旧页面时使用
    document.addEventListener("astro:after-swap", setThemeFeature)
}

// 同步系统更改
window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", ({ matches: isDark }) => {  
            themeValue = isDark ? "dark" : "light"
            setPreference()
        }
    )