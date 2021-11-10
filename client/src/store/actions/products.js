import axios from "axios";
import { REACT_APP_API } from "../consts/consts";

export const getAllProducts = () => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    // console.log(username,password)
    const { data } = await axios.get(`${REACT_APP_API}/products`);
    dispatch({ type: "GET_ALL_PRODUCTS", payload: data });
    // localStorage.setItem("userInfo", JSON.stringify(data.login));
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const prodAdd = (producto) => async (dispatch) => {
  console.log("agregando");
  try {
    const { data } = await axios.post(`${REACT_APP_API}/products/add`, producto);
    dispatch({ type: "PROD_ADMIN_ADD", payload: data });
    alert (
      "Producto agregado exitosamente"
    )
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const prodMod = (producto) => async (dispatch) => {
  console.log("modificando");
  try {
    const { data } = await axios.post(`${REACT_APP_API}/products/update`, producto);
    dispatch({ type: "PROD_ADMIN_MOD", payload: data });
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const getProdAdmin = (id) => async (dispatch) => {
  /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
  try {
    console.log(`${REACT_APP_API}/products/`+id)
    const { data } = await axios.get(`${REACT_APP_API}/products/`+id);
    dispatch({ type: "PROD_ADMIN_GET", payload: data });
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

/* export const prodRemove = (idsched) => async (dispatch) => {
  console.log("borrando");
  try {
    const { data } = await axios.delete(
      `${REACT_APP_API}/scheduler/${idsched}`
    );
    dispatch({ type: SCHED_REMOVE, payload: idsched });
  } catch (err) {
    dispatch({
      type: SCHED_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
}; */
