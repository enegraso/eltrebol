import axios from "axios";
import { REACT_APP_API } from "../consts/consts";

export const getAllOrders = () => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${REACT_APP_API}orders`);
      dispatch({ type: "GET_ALL_ORDERS", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data.login));
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  export const getOrder = (id) => async (dispatch) => {
    try {
      console.log("trying")
      const { data } = await axios.get(`${REACT_APP_API}orders/`+id);
      dispatch({ type: "GET_ORDER_ADMIN", payload: data });
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  export function addOrder(data) {
    return (dispatch) => {
        return axios(`${REACT_APP_API}orders/add`, data)
            .then(json => {
                dispatch({ type: 'ADD_ORDER', payload: json });
            })
    }
}

export const getOrderGuest = (id) => async (dispatch) => {
  try {
    console.log("trying")
    const { data } = await axios.get(`${REACT_APP_API}orders/`+id);
    dispatch({ type: "GET_ORDER", payload: data });
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};