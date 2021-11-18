import { loadStateAdmin } from "../localStorage";

const initialState = {
    userDetail: loadStateAdmin() === undefined ? []: loadStateAdmin(),
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

      case "PUT_USER_DETAIL":
        return{
          ...state,
          userDetail:action.payload,
        }

      default: return state;
    }
  }
