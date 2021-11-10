import React from 'react';
import './carrito.css'

export default function Cart(){


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
            </table>
        </div> 
        </div>    
        </>
    )
}