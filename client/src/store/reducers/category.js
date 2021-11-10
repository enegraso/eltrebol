const initialState = {
    allCategories:[],
    categoriesAdmin: [],
};


export default function categoryReducer(state = initialState, action){
    switch(action.type){
        case 'GET_ALL_CATEGORIES':
        return{
            ...state, 
            allCategories: action.payload,
        }
        case 'CATE_ADMIN_ADD':
        return{
           ...state,
           categoriesAdmin: state.categoriesAdmin.concat(action.payload)
        }
        default: return state;
    }
}