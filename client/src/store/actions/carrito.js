import Axios from 'axios';
import {loadState, saveState} from '../localStorage'

export function getGuestCart() {
    return (dispatch) => {
        const cartLoaded = loadState()
        dispatch({ type: "GET_GUEST_CART", payload: cartLoaded });
    }
}

export default function saveToGuestCart(prod) {
   // var ol = orderlines(prod)
    return (dispatch) => {
        saveState(prod)
        
        dispatch({ type: "UPDATE_GUEST_CART", payload: prod });
    }
}

export function DecreaseGuestLine(prod) {
    //prod.quantity -= 1;
    return (dispatch) => {
        dispatch({ type: 'DECREASE_GUEST_LINE', payload: prod });
    }
}

export function removeGuestLine(prod) {
    //prod.quantity -= 1;
    return (dispatch) => {
        dispatch({ type: 'REMOVE_GUEST_LINE', payload: prod });
    }
}