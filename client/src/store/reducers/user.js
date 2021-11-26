import { loadStateAdmin, loadConfigAdmin } from "../localStorage";

const initialState = {
  userDetail: loadStateAdmin() === undefined ? [] : loadStateAdmin(),
  configsAdmin: loadConfigAdmin() === undefined ? [] : loadConfigAdmin(),
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload,
      };

    case "LOGOUT_USER":
      return {
        ...state,
        userDetail: {},
      };

    case "PUT_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload,
      };

    case "PUT_CONFIG_DETAIL":
      return {
        ...state,
        configsAdmin: action.payload,
      };

    case "GET_CONFIG_DETAIL":
      return {
        ...state,
        configsAdmin: action.payload,
      };

      case "PUT_CONFIG_DETAIL":
        return {
          ...state,
          configsAdmin: action.payload,
        };

    default:
      return state;
  }
}
