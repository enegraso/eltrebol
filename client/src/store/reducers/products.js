const initialState = {
  allProducts: [],
  product: [],
  searchProduct: [],
  productsAdmin: [],
  productAdminGet: {},
  url: [],
  auxProducts: [],
  alertprod: "",
  alertprodAdmin: ""
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_ALL_PRODUCTS":
      return {
        ...state,
        allProducts: action.payload.data,
        auxProducts: action.payload.data,
      };

    case "GET_ALL_PRODUCTS_CATE":
      return {
        ...state,
        allProducts: action.payload,
      };

    case "GET_ALL_PRODUCTS_EXIST":
      return {
        ...state,
        productsAdmin: action.payload,
      };

    case "GET_ALL_PRODUCTS_ADMIN":
      return {
        ...state,
        productsAdmin: action.payload.data,
        auxProducts: action.payload.data,
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

    case "PROD_STOCK_MOD": //Modificar stock en boton ojo del admin
      return {
        ...state,
        productsAdmin: state.productsAdmin.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, exist: !p.exist };
          } else return p;
        }),
      };

    case "PROD_ADMIN_MOD": //Modificar stock en boton ojo del admin
      return {
        ...state,
        productsAdmin: state.productsAdmin.map((p) => {
          if (p.id === action.payload.id) {
            return {
              ...p,
              name: action.payload.name,
              price: Number(action.payload.price),
              exist: action.payload.exist,
              description: action.payload.description,
              isOfert: action.payload.isOfert,
              image: action.payload.image,
              units: action.payload.units,
              minunit: action.payload.minunit,
              stepunit: action.payload.stepunit,
              categories: action.payload.categories,
            };
          } else return p;
        }),
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
        productsAdmin: state.productsAdmin.filter((p) => p.id !== action.payload),
      };

    case "URL_INFO":
      return {
        ...state,
        url: action.payload,
      };

    case "PRODS_FOUNDED":
      return {
        ...state,
        allProducts: action.payload,
        alertprod: "",
      };

    case "PRODS_NOTFOUNDED":
      return {
        ...state,
        alertprod: action.payload,
      };

      case "PRODS_ADMIN_NOTFOUNDED":
        return {
          ...state,
          alertprodAdmin: action.payload,
        };

    case "PRODS_FOUNDED_ADMIN":
      return {
        ...state,
        productsAdmin: action.payload,
        alertprodAdmin: "",
      };

    case "SORT_PROD_ADMIN":
      return {
        ...state,
        productsAdmin: action.payload,
      };

    case "SORT_PRICE_ADMIN":
      return {
        ...state,
        productsAdmin: action.payload,
      };

    default:
      return state;
  }
}

/*         ...state,
        productsAdmin: state.productsAdmin.map((p) => {
          if (p.id === action.payload.id) {
            return { ...p, exist: !p.exist };
          } else return p;
        }), */
