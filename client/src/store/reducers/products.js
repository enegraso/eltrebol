const initialState = {
  allProducts: [],
  product: [],
  searchProduct: [],
  productsAdmin: [],
  productAdminGet: {},
  url: []
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload.data,
      };

    /*    case "ADD_PRODUCTS":
            return {
                ...state,
                allProducts: [...state.allProducts]
            } */

    case "PROD_ADMIN_ADD":
      return {
        ...state,
        productsAdmin: state.productsAdmin.concat(action.payload),
      };

    case "PROD_ADMIN_GET":
      return {
        ...state,
        productAdminGet: action.payload,
      };

    case "EDIT_PRODUCT":
      return {
        ...state,
        allProducts: [...state.allProducts, action.payload],
      };

    case "SEARCH_PRODUCTS":
      return {
        ...state,
        searchProduct: action.payload.data,
      };

    case "GET_PRODUCTID":
      return {
        ...state,
        product: action.payload.data.producto,
      };

    case "DELETE_PRODUCT":
      return {
        ...state,
        allProducts: state.allProducts.filter((p) => p.id !== action.payload),
      };

      case "URL_INFO":
        return {
            ...state,
            url: action.payload
        }

    default:
      return state;
  }
}
