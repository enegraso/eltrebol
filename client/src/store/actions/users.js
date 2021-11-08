import axios from 'axios'
import { REACT_APP_API } from "../consts/consts";

export const getUser = (username, password) => async (dispatch) => {

  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    console.log(username,password)
      const { data } = await axios.post(`${REACT_APP_API}/users/login`, { username, password })
      dispatch({ type: "GET_USER_DETAIL", payload: data })
      alert(data)
      localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (err) {
    alert(err.response && err.response.data.message
      ? err.response.data.message
      : err.message)
  }

}

/* export function getUser(nameuser, claveuser) {
    return function (dispatch) {
      return fetch(
        "http://cursohenry.ddns.net:3001/user?name=" +
          nameuser +
          "&pass=" +
          claveuser
      )
        .then((response) => response.json())
        .then((json) => {
          dispatch({ type: "GET_USER_DETAIL", payload: json });
        });
    };
  } */
  
  export function logOut(arg) {
    return function (dispatch) {
      dispatch({ type: "LOGOUT_USER", payload: arg });
    };
  }
  
  export function prode(arg) {
    return function (dispatch) {
      dispatch({ type: "ADD_PRODE", payload: arg });
    };
  }