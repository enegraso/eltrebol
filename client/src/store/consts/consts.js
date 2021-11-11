require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint

//productos
export const productsEndpoint= REACT_APP_API + 'products/';
export const productByIdEndpoint = productsEndpoint + ':id';
export const productByCatEndpoint = productsEndpoint + 'bycat/:category';
export const addProductEndpoint = productsEndpoint + 'add';
export const modifyProductEndpoint = productsEndpoint + 'update/:id';


//carrito

export const productId = REACT_APP_API + 'product/'

