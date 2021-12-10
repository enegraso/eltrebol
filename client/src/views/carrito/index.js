import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import './cart.css';
import {RiDeleteBin5Fill} from 'react-icons/ri'
import {getGuestCart, DecreaseGuestLine, removeGuestLine} from '../../store/actions/carrito';
import saveToGuestCart from '../../store/actions/carrito';
import {orderline, total} from '../../components/utils';

//MUI imports ------->
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton'
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Button from '@mui/material/Button';
//------------------->


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
            <Grid container spacing={2}>
                {!orderlines? <p>Cargando orden...</p> : orderlines.map(i=>(
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} rounded className='paper-prod'>
                        <Grid container spacing={2} style={{'display':'flex', 'justifyContent':'center'}}>
                        <Grid item>
                        <Avatar
                        className='avatar'
                        src={i.image}
                        alt='product'
                        sx={{width: 80, height: 80}}
                        />
                        </Grid>
                        <Grid item direction="column" spacing={2} p={4}>
                        
                        <span className='prod-title'>{i.name}</span>

                        <div className='prod-detail'>
                             <span>${i.price} x {i.quantity}</span>
                             <span>${(i.quantity * i.price)}</span>
                        </div>
                        
                        </Grid>
                        <Grid item direction='column' p={4}>
                        
                        <IconButton 
                             size='small'
                             onClick={() => dispatch(removeGuestLine(i))}><ClearIcon/></IconButton>

                        <div>
                              <IconButton
                              size='small' 
                              onClick={()=>i.quantity === i.minunit ? dispatch(removeGuestLine(i)) : dispatch(DecreaseGuestLine(i))}>
                                  <RemoveIcon/></IconButton>
                              <span>{i.quantity}</span>
                              <IconButton
                              size='small'
                              onClick={()=> { console.log("SUMO",i); dispatch(saveToGuestCart(i))} } 
                              >
                                  <AddIcon/></IconButton>
                        </div>
                        </Grid>
                        </Grid>
                    </Paper>
                </Grid>
                ))}
                <Grid item xs={12} md={4}>
                    Total...
                </Grid>
            </Grid>

        {/* <div className='container-sm cart-page'>
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
                    
                    <button className='buttonQuant'
                    onClick={()=>i.quantity === i.minunit ? dispatch(removeGuestLine(i)) : dispatch(DecreaseGuestLine(i))}>-</button>
                    <p className='pQuant'>{i.quantity}</p>
                    
                    <button className='buttonQuant'
                    onClick={()=> { console.log("SUMO",i); dispatch(saveToGuestCart(i))} } 
                    >+</button>
                    
                    </div>
                </td>

                <td>${(i.quantity * i.price)}</td>
            
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
            </table>
        </div>
        </div>     */}
        </>
    )
}