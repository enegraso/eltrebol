const initialState = {
    allCategories:[],
};

export default function categoryReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_CATEGORIES':
        return{
            ...state, 
            allCategories: action.payload,
        }
        default: return state;
    }
}