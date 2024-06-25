import { type AstroGlobal } from 'astro'

const createAllMd = async (Astro: AstroGlobal) => {
    let _array:Array<any> = []

    return _array.concat(import.meta.glob('../pages/posts/*.md'))
                // .concat(await Astro.glob('../pages/games/*.md'))
                // .concat(await Astro.glob('../pages/articles/*.md'))
}

export default {
    createAllMd
}