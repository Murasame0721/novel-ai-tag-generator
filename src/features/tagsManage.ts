import {createSlice} from "@reduxjs/toolkit";
import type {staticTag} from "../tags";

export declare type tag = staticTag & {
    weight: -3 | -2 | -1 | 0 | 1 | 2 | 3
}

declare type currentTags = tag[];
type adjustAction = {
    type: 'tags/deleteTag' | 'tags/upWeight' | 'tags/downWeight',
    payload: number
}
type pushAction = {
    type: 'tags/pushTag',
    payload: tag
}
type emptyAction = {
    type: 'tags/empty'
    payload?: any
}
type initialAction = {
    type: string,
    payload?: any
}
type supportActions = initialAction | adjustAction | pushAction | emptyAction;

const tagsSlice = createSlice({
    name: 'tags',
    initialState: [] as currentTags,
    reducers: {
        pushTag(state: currentTags, action: supportActions): tag[] {
            const newTag: tag = {...(action.payload as staticTag), weight: 0};
            return [...state, newTag];
        },
        deleteTag(state: currentTags, action: supportActions): tag[] {
            const index = action.payload as number;
            return state.filter((_, i) => i !== index);
        },
        upWeight(state: currentTags, action: supportActions): tag[] {
            const index = action.payload as number;
            if (state[index].weight < 3) {
                state[index].weight += 1;
            }
            return state
        },
        downWeight(state: currentTags, action: supportActions): tag[] {
            const index = action.payload as number;
            if (state[index].weight > -3) {
                state[index].weight -= 1;
            }
            return state
        },
        empty(): tag[] {
            return [];
        }
    }
})

export const {pushTag, deleteTag, upWeight, downWeight} = tagsSlice.actions;
export default tagsSlice.reducer;