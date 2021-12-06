import axios from "axios";
import { REACT_APP_API, configByIdEndpoint} from "../consts/consts";

export const getUser = (username, password) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.post(`${REACT_APP_API}users/login`, {
      username,
      password,
    });
    dispatch({ type: "GET_USER_DETAIL", payload: data.login });
    localStorage.setItem("userInfo", JSON.stringify(data.login));
    localStorage.setItem("allowLogin","si")
  } catch (err) {
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const updateUser = (user) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.put(`${REACT_APP_API}users/update`, {user});
    dispatch({ type: "PUT_USER_DETAIL", payload: data.user });
    localStorage.setItem("userInfo", JSON.stringify(data.user));
    localStorage.setItem("userUpdated",true)
  } catch (err) {
    localStorage.setItem("userUpdated",err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const updateConfigs = (config) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.put(`${REACT_APP_API}users/configs`, config);
    dispatch({ type: "PUT_CONFIG_DETAIL", payload: data.config });
    localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("configUpdated",true)
  } catch (err) {
    localStorage.setItem("configUpdated",err.response.data.message)
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const getConfig = (id) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    console.log(`${configByIdEndpoint}${id}`)
    const { data } = await axios.get(`${configByIdEndpoint}${id}`);
    dispatch({ type: "GET_CONFIG_DETAIL", payload: data.config });
    localStorage.setItem("appConfig", JSON.stringify(data.config));
    localStorage.setItem("userConfig",true);
  } catch (err) {
    localStorage.setItem("userConfig",err.response.data.message);
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export function logOut(arg) {
  return function (dispatch) {
    dispatch({ type: "LOGOUT_USER", payload: arg });

    localStorage.removeItem("userInfo");
    localStorage.removeItem("userUpdated")
    localStorage.removeItem("allowLogin")
    // Carteles de categoria admin
    localStorage.removeItem("categoryDeleted")
    localStorage.removeItem("categoryAdded")
    localStorage.removeItem("categoryUpdated")
    // Carteles de productadmin
    localStorage.removeItem("productDeleted")
    localStorage.removeItem("productAdded")
    localStorage.removeItem("productUpdated")
    // Configuración 
    localStorage.removeItem("configUpdated")
    localStorage.removeItem("userConfig")
    localStorage.removeItem("appConfig")
  };
}