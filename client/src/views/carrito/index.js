import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './carrito.css';
import {RiDeleteBin5Fill} from 'react-icons/ri'
import { getGuestCart, removeGuestLine, DecreaseGuestLine, saveToGuestCart } from '../../store/actions/carrito';
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

    return(
        <>
        <div className='container-sm cart-page'>
        <table>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
               {!guestOrderlines? <p>Cargando orden...</p> : guestOrderlines.map(i=>(
                   <tr>
                <td>
                    <div className='cart-info'>
                        <img src='' alt='product'/>
                        <div>
                            <p>{i.name}</p>
                            <small> Precio: {i.price}</small>
                            <a onclick={() => i.quantity === 1 ? dispatch(removeGuestLine(i.id)) : dispatch(DecreaseGuestLine(i))}>Remove</a>
                        </div>
                    </div>
                </td>
                <td>
                    <input
                    type='number'
                    value='1'
                    />
                </td>
                <td>$150.00</td>
            </tr>
            ))}
        </table>
        <div className='total-price'>
            <table>
                <tr>
                    <td>Subtotal</td>
                    <td>$150.00</td>
                </tr>
                <tr>
                    <td>Total</td>
                    <td>$150.00</td>
                </tr>
        <button className='btn btn-success'>Continuar</button>
        <button className='btn btn-danger'><RiDeleteBin5Fill/></button>
            </table>
        </div>
        </div>    
        </>
    )
}