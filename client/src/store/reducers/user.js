const initialState = {
    userDetail: {},
  };
  
  export default function userReducer(state = initialState, action){
    
    switch(action.type){
      case "GET_USER_DETAIL":
      return{
        ...state,
        userDetail:action.payload,
      }

      case "LOGOUT_USER":
      return{
        ...state,
        userDetail: {}
      }

      default: return state;
    }
  }
