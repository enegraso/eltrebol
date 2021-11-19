import axios from "axios";
import { REACT_APP_API, UPD_USER_SUCCESS } from "../consts/consts";

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
    localStorage.setItem("userUpdated",false)
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
    // Carteles de categoria admin
    localStorage.removeItem("categoryDeleted")
    localStorage.removeItem("categoryAdded")
    localStorage.removeItem("categoryUpdated")
    localStorage.removeItem("productDeleted")
    localStorage.removeItem("productAdded")

  };
}