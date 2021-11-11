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
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${REACT_APP_API}orders/`+id);
      dispatch({ type: "GET_ORDER_ADMIN", payload: data });
      console.log(`${REACT_APP_API}/orders/`+id)
      // localStorage.setItem("userInfo", JSON.stringify(data.login));
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };