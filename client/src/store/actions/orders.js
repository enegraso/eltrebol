import axios from "axios";
import { REACT_APP_API } from "../consts/consts";

export const ASC = "Update-A-Z";
export const DES = "Update-Z-A";

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
    console.log("trying");
    const { data } = await axios.get(`${REACT_APP_API}orders/` + id);
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
    console.log(data);
    return axios.post(`${REACT_APP_API}orders/add`, data).then((json) => {
      dispatch({ type: "ADD_ORDER", payload: json.data.order.id });
      localStorage.setItem("orderId", json.data.order.id);
    });
  };
}

export const getOrderGuest = (id) => async (dispatch) => {
  try {
    console.log("trying");
    const { data } = await axios.get(`${REACT_APP_API}orders/` + id);
    dispatch({ type: "GET_ORDER", payload: data });
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
    const { data } = await axios.put(`${REACT_APP_API}orders/updstatus`, {
      order,
    });
    dispatch({ type: "PREP_ORDER_ADMIN", payload: data });
    localStorage.setItem("orderPrepared", true);
  } catch (err) {
    localStorage.setItem("orderPrepared", err.response.data.message);
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export function deleteOrder(id) {
  return (dispatch) => {
    return axios
      .delete(`${REACT_APP_API}orders/delete/${id}`)
      .then((json) => {
        dispatch({ type: "DELETE_ORDER_GUEST", payload: id });
        localStorage.setItem("orderDeleted", true);
      })
      .catch((err) => {
        localStorage.setItem("orderDeleted", err.response);
      });
  };
}

export function sortUpdated(order, breeds) {
  console.log("ORDERS", breeds);
  let sortBreed = [...breeds];

  sortBreed.sort(function (a, b) {
    var nombreA = a.updatedAt;
    var nombreB = b.updatedAt;

    if (order === ASC) {
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    }
    if (order === DES) {
      if (nombreA < nombreB) {
        return 1;
      }
      if (nombreA > nombreB) {
        return -1;
      }
      return 0;
    }
  });
  console.log("PRODUCTOS ORDENADOS", sortBreed);
  return function (dispatch) {
    dispatch({ type: "SORT_ORDER_ADMIN", payload: sortBreed });
  };
}
