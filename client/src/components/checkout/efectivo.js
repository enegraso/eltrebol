import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {ButtonOne} from '../reutilizables/Button';
import { total, orderline } from '../utils';
import {prepOrder} from '../../store/actions/orders';
import { useNavigate } from 'react-router-dom';


export default function Efectivo(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const order = useSelector(state => state.Carrito.guestCart);
    //const orderId = useSelector(state=>state.Order.orderId)
    const orderid = localStorage.getItem("orderId");
/*     const orderlines = orderline(order) */
  const orderlines = JSON.parse(localStorage.getItem("order"))

    const handleClick = ()=>{
    console.log(orderid)
    const objStatus = {
        id:orderid,
        status:"pending",
      };
        dispatch(prepOrder(objStatus))
        if (localStorage.getItem("orderPrepared") === true)
        alert('Tu pedido fue realizado con exito!')
        else
        alert(localStorage.getItem("orderPrepared"))

    }

    const handleBack = () => {
      dispatch(deleteOrder(orderid))
      console.log(orderid)
      navigate('/') 
    }

    return(
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Producto</TableCell>
              <TableCell align="right">Precio</TableCell>
              <TableCell align="right">Cantidad</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderlines.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
              >
                <TableCell scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.price * row.quantity}</TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell scope='row' span=''>Total</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'>${total(orderlines)}</TableCell>
            </TableRow>
          </TableBody>
        <button className='btn btn-success' onClick={handleClick}>Comprar</button>
        <button className='btn btn-primary' onClick={handleBack}>Volver</button>
        </Table>
      </TableContainer>
    )

}