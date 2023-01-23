import {tag} from "./tagsManage";
import type {resultGeneratorState, supportActions} from "./resultGenerator.d";
import store from "../store";

function addFix(tag: string, weight: number,weightUpSymbol: '{' | '(') {
    let result = tag;
    const prefix = weightUpSymbol;
    const suffix = weightUpSymbol === '{' ? '}' : ')';
    if(weight > 0) {
        for (let i = 0; i < weight; i++) {
            result = prefix + result + suffix;
        }
    }
    if(weight < 0) {
        for (let i = 0; i < -weight; i++) {
            result = '[' + result + ']';
        }
    }
    return result;
}

function generateResult(tags: tag[], weightUpSymbol: '{' | '(') {
    let result = '';
    tags.forEach(tag => {
        let thisTag = tag.en
        thisTag = addFix(thisTag, tag.weight, weightUpSymbol);
        result += thisTag + ', ';
    })
    return result;
}

export function getResult() {
    return generateResult(store.getState().currentTags, store.getState().resultGenerator.weightUpSymbol)
}

export function resultGeneratorReducer(state:resultGeneratorState|undefined ={
    weightUpSymbol: '{',
} , action:supportActions):resultGeneratorState  {
    switch (action.type) {
        case 'resultGenerator/symbolSwitch':
            return {
                ...state,
                weightUpSymbol: action.payload
            }
    }
    return state;
}