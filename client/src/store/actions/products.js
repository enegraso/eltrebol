import Axios from 'axios';
import {productsEndpoint, productByCatEndpoint, productByIdEndpoint, addProductEndpoint, modifyProductEndpoint} from "../consts/consts";


export function addProduct(product) {
    return (dispatch) => {
        return Axios.post(`${addProductEndpoint}`, product)
        // .then(product => product.json())
        .then(json => {
            dispatch({ type: "ADD_PRODUCTS", payload: json });
        });
    }    
}

export function editProduct(id, newProduct) {
   return (dispatch) => {
    return Axios.put(`${productByIdEndpoint}`, newProduct)
        // .then(product => product.json())
        .then(json => {
            dispatch({ type: "EDIT_PRODUCT", payload: json });
        })
        .catch(err =>  console.log(err))
   }    
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

export function getProducts() {
    return (dispatch) => {
        return Axios(`${productsEndpoint}`)
        .then(products => console.log(products))
        .then(json => {
            dispatch({ type: "GET_PRODUCTS", payload: json });
        })
    }    
}

export function getProductId(id) {
    return (dispatch) => {
        return Axios(`${productsEndpoint}${id}`)
        // .then(products => products.json())
        .then(json => {
            dispatch({ type: "GET_PRODUCTID", payload: json });
        })
    }    
}

export function deleteProduct(id) {
    return (dispatch) => {
        return Axios.delete(`${productsEndpoint}${id}`)
        .then(json => {
            dispatch({ type: "DELETE_PRODUCT", payload: id });
        })
    }    
}


export function selectProductEdit(id){
    return(dispacth) => {
        dispacth({
            type: "SELECT_PRODUCT_ID",
            payload: id
        })
    }
}