import axios from "axios";
import { REACT_APP_API, categoriesEndpoint } from "../consts/consts";

export const getAllCategories = () => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
      // console.log(username,password)
      const { data } = await axios.get(`${REACT_APP_API}categories`);
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
      const { data } = await axios.post(`${REACT_APP_API}categories/add`, category);
      dispatch({ type: "CATE_ADMIN_ADD", payload: data });
      localStorage.setItem("categoryAdded",true)
    } catch (err) {
      localStorage.setItem("categoryAdded",false)
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  export const getCateAdmin = (id) => async (dispatch) => {
    /* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */
    try {
  /*     console.log(`${REACT_APP_API}/products/` + id); */
      const { data } = await axios.get(`${REACT_APP_API}categories/` + id);
      console.log(data)
      dispatch({ type: "CATE_ADMIN_GET", payload: data });
    } catch (err) {
      console.log(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  export function deleteCategory(id) {
    return (dispatch) => {
      return axios.delete(`${categoriesEndpoint}delete/${id}`).then((json) => {
        dispatch({ type: "DELETE_CATEGORY", payload: id });
        localStorage.setItem("categoryDeleted",true)
      }).catch(err => {
        localStorage.setItem("categoryDeleted",false)
        console.log(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )        
      });
    };
  }

  export const updateCategory = (cate) => async (dispatch) => {
    console.log(cate)
    try {

        const { data } = await axios.put(`${categoriesEndpoint}update`, {cate});
        dispatch({ type: "UPDATE_CATEGORY", payload: data });
        localStorage.setItem("categoryUpdated",true)
      }
      catch(err) {
        localStorage.setItem("categoryUpdated",false)
        console.log(
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message
        )        
    };
  }