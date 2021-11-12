import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './carrito.css';
import {RiDeleteBin5Fill} from 'react-icons/ri'

//importar actions
//decreaseGuestline, removeGuestline, getGuestCart

export default function Cart(){

    //map ---> GET --> guestCart.
    //remove orderLine.

    return(
        <>
        <div className='container-sm cart-page'>
        <table>
            <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
            </tr>
            <tr>
               {/*  HACER MAP ACA CON INFO CART */}
                <td>
                    <div className='cart-info'>
                        <img src='' alt='product'/>
                        <div>
                            <p>Product Name</p>
                            <small> Price: $150.00</small>
                            <a href=''>Remove</a>
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