const initialState = {
    allCategories:[],
    categoriesAdmin: [],
    categoryAdminGet: {}
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
        case "CATE_ADMIN_GET":
            return {
              ...state,
              categoryAdminGet: action.payload,
            };

            case "DELETE_CATEGORY":
                return {
                  ...state,
                  allCategories: state.allCategories.filter((c) => c.id !== action.payload),
                };
        default: return state;
    }
}