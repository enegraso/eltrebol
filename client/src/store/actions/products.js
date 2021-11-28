import Axios from "axios";
import {
  REACT_APP_API,
  productsEndpoint,
  productByIdEndpoint,
  addProductEndpoint,
  modifyProductEndpoint,
  stockProductEndpoint
} from "../consts/consts";

export function getAllProducts() {
  console.log("hola estoy en products - " + `${productsEndpoint}`);
  return (dispatch) => {
    return Axios(`${productsEndpoint}`).then((json) => {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: json });
    });
  };
}

export function getAllProductsAdmin() {
  console.log("hola estoy en products - " + `${productsEndpoint}admin`);
  return (dispatch) => {
    return Axios(`${productsEndpoint}admin`).then((json) => {
      dispatch({ type: "GET_ALL_PRODUCTS_ADMIN", payload: json });
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

export function editProduct(newProduct) {
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
    return Axios.delete(`${productsEndpoint}delete/${id}`)
      .then((json) => {
        dispatch({ type: "DELETE_PRODUCT", payload: id });
        localStorage.setItem("productDeleted", true);
      })
      .catch((err) => {
        localStorage.setItem("productDeleted", err.response.data.message);
      });
  };
}


export const prodAdd = (producto) => async (dispatch) => {
  console.log("agregando");
  try {
    const { data } = await Axios.post(`${addProductEndpoint}`, producto);
    dispatch({ type: "PROD_ADMIN_ADD", payload: data });
    localStorage.setItem("productAdded", true);
  } catch (err) {
    localStorage.setItem("productAdded", err.response.data.message);
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const prodStock = (id) => async (dispatch) => {
  console.log("stock: "+id);
  try {
    const { data } = await Axios.post(`${stockProductEndpoint}`, {id:id});
    dispatch({ type: "PROD_STOCK_MOD", payload: data.product });
    localStorage.setItem("stockModified", true);
  } catch (err) {
    localStorage.setItem("stockModified", err.response.data.message);
    console.log(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};


export const prodMod = (producto) => async (dispatch) => {
  console.log("modificando");
  try {
    const { data } = await Axios.put(`${modifyProductEndpoint}`, producto);
    dispatch({ type: "PROD_ADMIN_MOD", payload: data });
    localStorage.setItem("productUpdated", true);
  } catch (err) {
    localStorage.setItem("productUpdated", err.response.data.message);
    console.log(
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
    console.log(data);
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


 export const searchProducts = (buscar) => async (dispatch) => {
  console.log("buscando");
  try {
    const { data } = await Axios.get(`${REACT_APP_API}products/search/${buscar}`
    );
    dispatch({ type: "PRODS_FOUNDED", payload: data });
    console.log(data)
  } catch (err) {
    alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    );
  }
};

export const searchProductsAdmin = (buscar) => async (dispatch) => {
  console.log("buscando");
  try {
    const { data } = await Axios.get(`${REACT_APP_API}products/search/${buscar}`
    );
    dispatch({ type: "PRODS_FOUNDED_ADMIN", payload: data });
    console.log(data)
  } catch (err) {
    alert(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    );
  }
};

