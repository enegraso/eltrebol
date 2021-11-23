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

  export const prepOrder = (order) => async (dispatch) => {
    try {
      const { data } = await axios.put(`${REACT_APP_API}orders/updstatus`,{order});
      dispatch({ type: "PREP_ORDER_ADMIN", payload: data });
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };