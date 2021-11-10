const initialState = {
    userDetail: {},
    // State para admins
    allOrders: [],
    orderAdmin: {},
    orderLineAdmin: [],
    allProducts: [],
    productsAdmin: [],
    prductAdminGet: {},
    categoriesAdmin: [],
    allCategories: []
    // States para admins
  };
  
  function rootReducer(state = initialState, action) {
    if (action.type === "GET_USER_DETAIL") {
      return {
        ...state,
        userDetail: action.payload,
      };
    }
  
    if (action.type === "LOGOUT_USER") {
      console.log("action.payload")
      return {
        ...state,
        userDetail: {},
      };
    }
  
    if (action.type === "GET_ALL_ORDERS") {
      return {
        ...state,
        allOrders: action.payload,
      };
    }

    if (action.type === "GET_ALL_PRODUCTS") {
      return {
        ...state,
        allProducts: action.payload,
      };
    }

    if (action.type === "GET_ALL_CATEGORIES") {
      return {
        ...state,
        allCategories: action.payload,
      };
    }

    if (action.type === "PROD_ADMIN_ADD") {
      return {
        ...state, productsAdmin: state.productsAdmin.concat(action.payload) 
      };
    }

    if (action.type === "PROD_ADMIN_GET") {
      return {
        ...state,
        productAdmin: action.payload
      };
    }

    if (action.type === "GET_ORDER_ADMIN") {
      return {
        ...state,
        orderAdmin: action.payload
      };
    }

    if (action.type === "CATE_ADMIN_ADD") {
      return {
        ...state, categoriesAdmin: state.categoriesAdmin.concat(action.payload) 
      };
    }

    return state;
  }
  
  export default rootReducer;
