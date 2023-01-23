import {configureStore} from "@reduxjs/toolkit";
import tagsReducer from "./features/tagsManage";
import tagsLanguageReducer from "./features/tagsLanguage";
import swfModeReducer from "./features/sfwMode";
import currentEditToolReducer from "./features/currentEditTool";
import {resultGeneratorReducer} from "./features/resultGenerator";

export default configureStore({
    reducer: {
        currentTags: tagsReducer,
        language: tagsLanguageReducer,
        sfwMode: swfModeReducer,
        currentEditTool: currentEditToolReducer,
        resultGenerator: resultGeneratorReducer,
    }
})