import type {tag} from "./tagsManage";

type weightUpSymbolSwitchAction = {
    type: 'resultGenerator/symbolSwitch',
    payload: '{' | '('
}
type renewResultAction = {
    type: 'resultGenerator/renewResult',
    payload: tag[]
}
type initialAction = {
    type: string,
    payload?: any
}
export type supportActions =  initialAction |weightUpSymbolSwitchAction | renewResultAction ;
export type resultGeneratorState ={
    weightUpSymbol: '{' | '(',
}