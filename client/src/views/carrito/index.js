import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './carrito.css';
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { getGuestCart, removeGuestLine, DecreaseGuestLine } from '../../store/actions/carrito';
import saveToGuestCart from '../../store/actions/carrito';
import {orderline} from '../../components/utils';


export default function Cart(){

    const dispatch = useDispatch();
    const orden = useSelector(state => state.Carrito.guestCart)

    console.log(orden)
    const guestOrderlines = orderline(orden);

    useEffect(()=>{
        dispatch(getGuestCart())
    },[])

    const orderlines = guestOrderlines.sort(function(a,b){
        if(a.id>b.id){
            return 1
        }
        if (a.id<b.id){
            return -1
        }
        return 0
    });

    const total = (arr) => {
        let t = 0;
    
      for (let i = 0; i < arr.length; i++) {
    
        t += arr[i].quantity*arr[i].price
      }
      return t;
    }
    

    return(
        <>
        <div className='container-sm cart-page'>
        <table>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
               {!orderlines? <p>Cargando orden...</p> : orderlines.map(i=>(
                   <tr>
                <td>
                    <div className='cart-info'>
                        <img src={i.image} alt='product'/>
                        <div>
                            <p>{i.name}</p>
                            <small> Precio: {i.price}</small>
                            <br/>
                            <button className='buttonQuant' onclick={() => dispatch(removeGuestLine(i.id))}>Remove</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='quantity' style={{'display':'flex', 'align-items':'row'}}>
                    <button className='buttonQuant' style={{}} 
                    onClick={()=>i.quantity === 1 ? removeGuestLine(i.id) : dispatch(DecreaseGuestLine(i))}>-</button>
                    <p className='pQuant'>{i.quantity}</p>
                    <button className='buttonQuant' style={{}}
                    onClick={()=>dispatch(saveToGuestCart(i))}
                    >+</button>
                    </div>
                </td>
                <td>${i.quantity * i.price}</td>
            </tr>
            ))}
        </table>
        <div className='total-price'>
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>${total(guestOrderlines)}</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>${total(guestOrderlines)}</td>
                </tr>
        <button className='btn btn-success'>Continuar</button>
     {/*    <button className='btn btn-danger'><RiDeleteBin5Fill/></button> */}
            </table>
        </div>
        </div>    
        </>
    )
}