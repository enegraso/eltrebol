import { loadState } from "../localStorage";
import {orderline, decrease} from '../../components'

const initialState = {
    guestOrder: [],
    guestCart: loadState() === undefined ? []: loadState(),
    guestCartProd: []
};


export default function cartReducer(state = initialState, action){
    switch(action.type){
        case "GET_GUEST_CART":
            return {
                ...state,
                guestCart: state.guestCart,
                //guestOrder: action.payload
            }

        case "UPDATE_GUEST_CART":
            return {
                ...state,
                guestCartProd: [...state.guestCartProd, action.payload],
                guestCart: [...state.guestCartProd, action.payload],
                guestOrder: orderline([...state.guestCart])
                /* cart: action.payload.cart,
                cartProd: action.payload */
            }
            case "INCREASE_GUEST_LINE":
                return {
                    ...state,
                    guestCart: state.guestCart,
                }
    
            case "DECREASE_GUEST_LINE":
                return {
                    ...state,
                    guestCart: decrease([...state.guestCart], action.payload.id)
                }
                
            case "REMOVE_GUEST_LINE":
                return {
                    ...state,
                    guestCart: state.guestCart.filter((i) => i.id !== action.payload)
                }

            default: return state;
    }
}