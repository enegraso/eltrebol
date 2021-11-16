import Axios from "axios";
import {
  REACT_APP_API,
  productsEndpoint,
  productByCatEndpoint,
  productByIdEndpoint,
  addProductEndpoint,
  modifyProductEndpoint,
} from "../consts/consts";

export function getAllProducts() {
  console.log("hola estoy en products - "+`${productsEndpoint}`);
  return (dispatch) => {
    return Axios(`${productsEndpoint}`).then((json) => {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: json });
    });
  };
}

export function addProduct(product) {
  return (dispatch) => {
    return (
      Axios.post(`${addProductEndpoint}`, product)
        // .then(product => product.json())
        .then((json) => {
          dispatch({ type: "ADD_PRODUCTS", payload: json });
        })
    );
  };
}

export function editProduct(id, newProduct) {
  return (dispatch) => {
    return (
      Axios.put(`${productByIdEndpoint}`, newProduct)
        // .then(product => product.json())
        .then((json) => {
          dispatch({ type: "EDIT_PRODUCT", payload: json });
        })
        .catch((err) => console.log(err))
    );
  };
}

//hay q hacer ruta search-------------
/* export function searchProducts(name) {
    return (dispatch) => {
        return Axios( `${REACT_APP_API}/search?query=` + name )
        // .then(products => products.json())
        .then(json => {
            dispatch({ type: "SEARCH_PRODUCTS", payload: json });
        });
    }    
} */

export function getProductId(id) {
  return (dispatch) => {
    return (
      Axios(`${productsEndpoint}${id}`)
        // .then(products => products.json())
        .then((json) => {
          dispatch({ type: "GET_PRODUCTID", payload: json });
        })
    );
  };
}

export function deleteProduct(id) {
  return (dispatch) => {
    return Axios.delete(`${productsEndpoint}delete/${id}`).then((json) => {
      dispatch({ type: "DELETE_PRODUCT", payload: id });
      alert(json.data.message)
    });
  };
}

/* export function selectProductEdit(id){
    return(dispacth) => {
        dispacth({
            type: "SELECT_PRODUCT_ID",
            payload: id
        })
    }
     */
/* dispatch({ type: USER_SIGNIN_REQUEST, payload: { username, password } }) */

export const prodAdd = (producto) => async (dispatch) => {
  console.log("agregando");
  try {
    const { data } = await Axios.post(`${addProductEndpoint}`, producto);
    dispatch({ type: "PROD_ADMIN_ADD", payload: data });
    alert("Producto agregado exitosamente");
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
    const { data } = await Axios.post(`${modifyProductEndpoint}`, producto);
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
/*     console.log(`${REACT_APP_API}/products/` + id); */
    const { data } = await Axios.get(`${REACT_APP_API}products/` + id);
    console.log(data)
    dispatch({ type: "PROD_ADMIN_GET", payload: data });
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const urlPost = (url) => {
  return function (dispatch) {
    dispatch({ type: "URL_INFO", payload: url });
    localStorage.setItem("urlImage", JSON.stringify(url));
  };
};

/*
 export const prodRemove = (idsched) => async (dispatch) => {
  console.log("borrando");
  try {
    const { data } = await axios.delete(`${REACT_APP_API}/scheduler/${idsched}`
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
};
 */
