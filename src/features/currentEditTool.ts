type currentEditTool = 'remove' | 'weightUp' | 'weightDown'

export default function currentEditToolReducer(state:currentEditTool = 'remove', action: any): currentEditTool {
    switch (action.type) {
        case 'currentEditTool/remove':
            return 'remove';
        case 'currentEditTool/weightUp':
            return 'weightUp';
        case 'currentEditTool/weightDown':
            return 'weightDown';
    }
    return state;
}