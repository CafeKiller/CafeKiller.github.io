const primaryColorScheme = "" // Ԥ������ɫ

// ��ȡ���ش洢�� ����ɫ
const currentTheme = localStorage.getItem("__cafe-blog_theme")

/**
 * @description ��ȡ�û��豸��ƫ������ɫ, ���Ȼ�ȡ���ش洢�е�����ɫ,
 * ��λ�ȡԤ�������ɫ, ����ȡϵͳ��ƫ������ɫ.
 * @returns { String } ��������ɫ
 * */ 
function getPreferTheme() {
    
    if (currentTheme) return currentTheme

    if (primaryColorScheme) return primaryColorScheme

    return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
}

// ��ȡ�û��豸��ƫ������
let themeValue = getPreferTheme()

// ����ƫ��
function setPreference() {
    localStorage.setItem("__cafe-blog_theme", themeValue)
    reflectPreference()
}

/**
 * @description �����õ�ƫ������ɫ��Ӧ��ҳ����ʽ�ͽṹ��
 * */ 
function reflectPreference() {
    
    document.firstElementChild.setAttribute("data-theme", themeValue)
    document.querySelector("#theme-btn")?.setAttribute("aria-label", themeValue)

    if (themeValue === 'dark') {
        document.documentElement.classList.add('dark')
    } else {
        document.documentElement.classList.remove('dark')
    }

    // ���� meta ֵ
    const body = document.body
    if (body) {
        const computedStyles = window.getComputedStyle(body)
        const bgColor = computedStyles.backgroundColor
        document.querySelector("meta[name='theme-color']")
                ?.setAttribute("content", bgColor)
    }
}

reflectPreference()

// ���������л���ť
window.onload = () => {
    function setThemeFeature() {
        // ���ó�ʼֵ���Ա���Ļ�Ķ����ܹ���ȡ���µ�ֵ
        reflectPreference();

        document.querySelector("#theme-btn")?.addEventListener("click", () => {
            themeValue = themeValue === "light" ? "dark" : "light"            
            setPreference()
        })
    }

    setThemeFeature()

    // "astro:after-swap" �¼�������ҳ���滻��ҳ��ʱʹ��
    document.addEventListener("astro:after-swap", setThemeFeature)
}

// ͬ��ϵͳ����
window.matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", ({ matches: isDark }) => {  
            themeValue = isDark ? "dark" : "light"
            setPreference()
        }
    )