import axios from "axios";
import { REACT_APP_API } from "../consts/consts";

export const getAllCategories = () => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${REACT_APP_API}/categories`);
      dispatch({ type: "GET_ALL_CATEGORIES", payload: data });
      // localStorage.setItem("userInfo", JSON.stringify(data.login));
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  export const cateAdd = (category) => async (dispatch) => {
    console.log("agregando",category);
    try {
      const { data } = await axios.post(`${REACT_APP_API}/categories/add`, category);
      dispatch({ type: "CATE_ADMIN_ADD", payload: data });
    } catch (err) {
      alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };