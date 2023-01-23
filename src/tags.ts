import {tags} from "./tagLibrary";

export declare type staticTag = {
    h1: string,
    h2: string,
    zh: string,
    en: string,
}

type tag = {
    h1: string,
    h2: string,
    zh: string,
    en: string
}
const tagsFormatted:tag[] = []

for (const [tagH1,tags2] of Object.entries(tags)) {
    for (const [tagH2,tags3] of Object.entries(tags2)) {
        for (const tag1 of tags3) {
            tagsFormatted.push({
                h1: tagH1,
                h2: tagH2,
                zh: tag1.zh,
                en: tag1.en
            })
        }
    }
}

const tags3DimArray: tag[][][] = [];

const tagH1:string[] = [];
for (const tag of tagsFormatted) {
    if (!tagH1.includes(tag.h1)) {
        tagH1.push(tag.h1)
    }
}
for (const h1 of tagH1) {
    //选中h1下的所有tag
    const tagsUnderH1:tag[] =[];
    for (const tag of tagsFormatted) {
        if (tag.h1 === h1) {
            tagsUnderH1.push(tag)
        }
    }

    //向tags3DimArray中添加h1
    const tags2DimArray:tag[][] = [];

    //获取这个h1下的所有h2
    const tagH2:string[] = [];
    for (const tag of tagsUnderH1) {
        if (!tagH2.includes(tag.h2)) {
            tagH2.push(tag.h2)
        }
    }

    //将各个h2下的tag放入tags2DimArray
    for (const h2 of tagH2) {
        const tagsUnderH2:tag[] = [];
        for (const tag of tagsUnderH1) {
            if (tag.h2 === h2) {
                tagsUnderH2.push(tag)
            }
        }
        tags2DimArray.push(tagsUnderH2)
    }
    tags3DimArray.push(tags2DimArray)
}

export {tags3DimArray}

export default tagsFormatted
export const tagTextDisplay = function (tag: staticTag, language: 'zh' | 'en' | 'both'): string {
    switch (language) {
        case 'zh':
            return tag.zh;
        case 'en':
            return tag.en;
        case 'both':
            return tag.zh + ' ' + tag.en;
    }
}