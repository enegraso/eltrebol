import { combineReducers } from "redux";
import productReducers from "./products";
import userReducers from './user';
import orderReducer from './order';
import categoryReducer from './category';
import cartReducer from "./carrito";


export default combineReducers({
    Product: productReducers,
    User: userReducers,
    Category: categoryReducer,
    Order: orderReducer,
    Carrito: cartReducer
  });

  
//  export default rootReducer;
