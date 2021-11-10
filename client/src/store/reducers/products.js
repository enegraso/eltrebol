const initialState = {
    allProducts: [],
    product: [],
    searchProduct: [],    
}

export default function productReducer(state = initialState, action){
    switch (action.type) {
        case "GET_ALL_PRODUCTS":
            return {
                ...state,
                allProducts: action.payload.data
            }

        case "ADD_PRODUCTS":
            return {
                ...state,
                allProducts: [...state.products]
            }
        
        case "EDIT_PRODUCT":
            return {
                ...state,             
                allProducts:  [...state.products, action.payload    ]    
            }

        case "SEARCH_PRODUCTS":
            return {
                ...state,
                searchProduct: action.payload.data
            }
        
        case "GET_PRODUCTID":
            return {
                ...state,
                product: action.payload.data.producto
            }

        case "DELETE_PRODUCT":
            return {
                ...state,
                allProducts: state.products.filter((p) => p.id !== action.payload)
            }

        
            default: return state;
    
    }
}