const initialState = {
    userDetail: {},
    gameProde: 0
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
        userDetail: state.userDetail.filter(user => user.idusuario !== action.payload),
      };
    }
  
    if (action.type === "ADD_PRODE") {
      return {
        ...state,
        gameProde: action.payload,
      };
    }
  
    return state;
  }
  
  export default rootReducer;
