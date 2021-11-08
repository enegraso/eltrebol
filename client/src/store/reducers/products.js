const initialState = {
    products: [],
    product: [],
    searchProduct: [],    
}

export default function productReducer(state = initialState, action){
    switch (action.type) {
        case "GET_PRODUCTS":
            return {
                ...state,
                products: action.payload.data
            }

        case "ADD_PRODUCTS":
            return {
                ...state,
                products: [...state.products]
            }
        
        case "EDIT_PRODUCT":
            return {
                ...state,             
                products:  [...state.products, action.payload    ]    
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
                products: state.products.filter((p) => p.id !== action.payload)
            }

        
            default: return state;
    
    }
}