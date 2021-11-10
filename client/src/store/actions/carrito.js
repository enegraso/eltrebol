import Axios from 'axios';
import {productId} from ''

export function addCartItem(id){
    return (dispatch)=>{
        return Axios(`${productId}+${id}`)
        .then(json=>{
            dispatch({type: 'ADD_ITEM', payload:json})
        })
    }
}
