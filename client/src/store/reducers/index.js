import { combineReducers } from "redux";
import productReducers from "./products";
import userReducers from './user';


export default combineReducers({
    Product: productReducers,
    User: userReducers,
  });