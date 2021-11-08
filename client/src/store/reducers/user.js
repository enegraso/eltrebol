const initialState = {
    userDetail: {},
    gameProde: 0
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
        userDetail: state.userDetail.filter(user => user.idusuario !== action.payload)
      }

      case "ADD_PRODE":
      return{
        ...state,
        gameProde: action.payload,
      }
      default: return state;
    }
  }
