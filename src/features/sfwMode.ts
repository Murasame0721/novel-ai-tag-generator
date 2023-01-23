import type {staticTag} from "../tags";

type supportActions = {
    type: 'swfMode/enable' | 'swfMode/disable' | string
}

export function isSwf(tag: staticTag) {
    let isSwf = true;
    if(tag.h1.indexOf('nsfw')!== -1) isSwf = false;
    if(tag.h1.indexOf('R18')!== -1) isSwf = false;
    if(tag.h2.indexOf('nsfw')!== -1) isSwf = false;
    if(tag.h2.indexOf('R18')!== -1) isSwf = false;
    return isSwf;
}

export default function swfModeReducer(state: boolean = true, action: supportActions) {
    switch (action.type) {
        case 'swfMode/enable':
            return true;
        case 'swfMode/disable':
            return false;
    }
    return state;
}