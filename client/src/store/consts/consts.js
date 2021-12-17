require('dotenv').config()
export const REACT_APP_API = process.env.REACT_APP_API //endpoint

//productos
export const productsEndpoint= REACT_APP_API + 'products/';
export const productByIdEndpoint = productsEndpoint + ':id';
export const productByCatEndpoint = productsEndpoint + 'bycat/:category';
export const addProductEndpoint = productsEndpoint + 'add';
export const stockProductEndpoint = productsEndpoint + 'stock'
export const modifyProductEndpoint = productsEndpoint + 'update';

// categories

export const categoriesEndpoint= REACT_APP_API + 'categories/';

//carrito

export const productId = REACT_APP_API + 'product/'

// configs y users

export const usersEndpoint= REACT_APP_API + 'users/';

export const configByIdEndpoint = usersEndpoint+ 'configs/';

// webpush

export const webpushEndpoint= REACT_APP_API + 'push/';
export const suscribeEndpoint= REACT_APP_API + 'push/subscription';


