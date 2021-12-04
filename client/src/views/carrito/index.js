import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './carrito.css';
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {getGuestCart, DecreaseGuestLine, removeGuestLine} from '../../store/actions/carrito';
import saveToGuestCart from '../../store/actions/carrito';
import {orderline, total} from '../../components/utils';


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
               {!orderlines? <p>Cargando orden...</p> : orderlines.map(i=>(
                   <tr>
                <td>
                    <div className='cart-info'>
                        <img src={i.image} alt='product'/>
                        <div>
                            <p>{i.name}</p>
                            <small> Precio: {i.price}</small>
                            <br/>
                            <button className="btn btn-secondary" onClick={() => dispatch(removeGuestLine(i))}>Quitar</button>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='quantity' style={{'display':'flex', 'align-items':'row'}}>
                    <button className='buttonQuant' style={{}} 
                    onClick={()=>i.quantity === 1 ? dispatch(removeGuestLine(i)) : dispatch(DecreaseGuestLine(i))}>-</button>
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
                </tr>{/* 
        <Link to='/paso1'>
        <button className='btn btn-success'>Continuar</button>
        </Link> */}
     {/*    <button className='btn btn-danger'><RiDeleteBin5Fill/></button> */}
            </table>
        </div>
        </div>    
        </>
    )
}