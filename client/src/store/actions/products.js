import Axios from "axios";
import {
  REACT_APP_API,
  productsEndpoint,
  productByIdEndpoint,
  addProductEndpoint,
  modifyProductEndpoint,
  stockProductEndpoint,
} from "../consts/consts";

export const ASC = "Breeds-A-Z";
export const DES = "Breeds-Z-A";
export const PASC = "Weight-A-Z";
export const PDES = "Weight-Z-A";

export function getAllProducts() {
  console.log("hola estoy en products - " + `${productsEndpoint}`);
  return (dispatch) => {
    return Axios(`${productsEndpoint}`).then((json) => {
      dispatch({ type: "GET_ALL_PRODUCTS", payload: json });
    });
  };
}

export function getAllProductsCat() {
  // console.log("hola estoy productos agrupados por categoria - " + `${productsEndpoint}`);
  return (dispatch) => {
    return Axios(`${productsEndpoint}grupocat`).then((json) => {
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


// Ordeno por Existencias Admin
export function sortExist(order, breeds) {
  // console.log("PRODUCTOS", breeds);
  let sortBreed = [...breeds];
console.log("A VER stock",breeds)
  sortBreed.sort(function (a, b) {
    var nombreA = a.exist;
    var nombreB = b.exist;

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
  // console.log("PRODUCTOS ORDENADOS", sortBreed);
  return function (dispatch) {
    //      dispatch({type: "SORT_PROD_ADMIN", payload: sortBreed})
    dispatch({ type: "GET_ALL_PRODUCTS_EXIST", payload: sortBreed });
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

export const deleteProduct = (id) => async (dispatch) => {

    try {
    const { data } = await Axios.delete(`${productsEndpoint}delete/${id}`)
      
        dispatch({ type: "DELETE_PRODUCT", payload: id });
        localStorage.setItem("productDeleted", true);
    }
      catch(err) {
        localStorage.setItem("productDeleted", err.response.data.message);
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
  console.log("stock: ", id, "ruta", stockProductEndpoint);
  try {
    const { data } = await Axios.post(`${stockProductEndpoint}`, { id: id });
    dispatch({ type: "PROD_STOCK_MOD", payload: data.product });
    console.log(data.product)
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
  console.log("modificando", modifyProductEndpoint);
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
    const { data } = await Axios.get(`${REACT_APP_API}products/admin/` + id);
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
    const urlsegura = url.replace("http://","https://")
    // console.log("URL de imagen",urlsegura)
    localStorage.setItem("urlImage", urlsegura);
  };
};

export const searchProducts = (buscar) => async (dispatch) => {
  console.log("buscando");
  try {
    const { data } = await Axios.get(
      `${REACT_APP_API}products/search/${buscar}`
    );
    dispatch({ type: "PRODS_FOUNDED", payload: data });
    console.log(data)
    if (data.length === 0) 
    dispatch({ type: "PRODS_NOTFOUNDED", payload: "NO SE Encontro" });
    } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

export const searchProductsAdmin = (buscar) => async (dispatch) => {
  console.log("buscando");
  try {
    const { data } = await Axios.get(
      `${REACT_APP_API}products/search/${buscar}`
    );
    dispatch({ type: "PRODS_FOUNDED_ADMIN", payload: data });
    console.log(data);
    if (data.length === 0) 
    dispatch({ type: "PRODS_ADMIN_NOTFOUNDED", payload: "NO SE Encontro" }); 
  } catch (err) {
    alert(
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message
    );
  }
};

// Ordeno por categorias de producto
export function sortCat(order, breeds) {
  // console.log("PRODUCTOS", breeds);
  let sortBreed = [...breeds];

  sortBreed.sort(function (a, b) {
    var nombreA = a.categories[0].category.toUpperCase();
    var nombreB = b.categories[0].category.toUpperCase();

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
  // console.log("PRODUCTOS ORDENADOS", sortBreed);
  return function (dispatch) {
    //      dispatch({type: "SORT_PROD_ADMIN", payload: sortBreed})
    dispatch({ type: "GET_ALL_PRODUCTS_CATE", payload: sortBreed });
  };
}

// Ordeno por nombre de producto
export function sort(order, breeds) {
  console.log("PRODUCTOS", breeds);
  let sortBreed = [...breeds];

  sortBreed.sort(function (a, b) {
    var nombreA = a.name.toUpperCase();
    var nombreB = b.name.toUpperCase();

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
    dispatch({ type: "SORT_PROD_ADMIN", payload: sortBreed });
  };
}

// Ordeno por precio
export function sortweight(order, breeds) {
  let sortWeight = [...breeds];

  sortWeight.sort(function (a, b) {
    var pesoA = a.price;
    var pesoB = b.price;

    if (order === PASC) {
      if (pesoA < pesoB) {
        return -1;
      }
      if (pesoA > pesoB) {
        return 1;
      }
      return 0;
    }
    if (order === PDES) {
      if (pesoA < pesoB) {
        return 1;
      }
      if (pesoA > pesoB) {
        return -1;
      }
      return 0;
    }
  });

  return function (dispatch) {
    dispatch({ type: "SORT_PRICE_ADMIN", payload: sortWeight });
  };
}

export const filtroCate = (actualBreed, temperament) => (dispatch) => {
  let filtro = [...actualBreed];
  console.log("CATEGORIA a Filtrar", filtro, "Filtar", temperament);
  filtro = filtro.filter((actual) => {
    if (actual.categories[0].id == temperament) {
      let prodTemp = actual;
      /* console.log("PRODS",prodTemp) */
      return prodTemp;
    } else {
      return false;
    }
  });
  dispatch({ type: "SORT_PROD_ADMIN", payload: filtro });
};
