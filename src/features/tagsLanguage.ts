type supportCommands = 'tagsLanguage/en' | 'tagsLanguage/zh' | 'tagsLanguage/both';
type languages = 'en' | 'zh' | 'both'
type action = {
    type: supportCommands
}

export default function tagsLanguageReducer(state: languages= 'both', action: action) {
    switch (action.type) {
        case "tagsLanguage/en":
            return 'en';
        case "tagsLanguage/zh":
            return 'zh';
        case "tagsLanguage/both":
            return 'both';
    }
    return state;
}