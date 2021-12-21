import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { total, orderline } from '../utils';
import {prepOrder, deleteOrder} from '../../store/actions/orders';

//Material UI-------------------------->

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid';
import {ButtonOne} from '../reutilizables/Button'

//-------------------------------------->

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
        if (localStorage.getItem("orderPrepared") == "true")
          navigate('/success')
        // alert('Tu pedido fue realizado con exito!')
        else
        alert(localStorage.getItem("orderPrepared"))

    }

    const handleBack = () => {
      dispatch(deleteOrder(orderid))
      console.log(orderid)
      navigate('/')  
    }

    return(
      <Grid container spacing={2} direction="column" alignItems="center" style={{'marginTop':'100px'}}>
        <Grid item>
          <h3>Pago en Efectivo</h3>
        </Grid>
        <Grid item>
        <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><>Producto</></TableCell>
              <TableCell align="right"><>Precio</></TableCell>
              <TableCell align="right"><>Cantidad</></TableCell>
              <TableCell align="right"><>Subtotal</></TableCell>
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
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right"><b>${row.price * row.quantity}</b></TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell scope='row' span=''><h5><b>Total</b></h5></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'><h5 style={{'color':'red'}}><b>${total(orderlines).toFixed(2).replace(".",",")}</b></h5></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item>
        <ButtonOne style={{'width':'100px'}} onClick={handleClick}>Comprar</ButtonOne>
      </Grid>  
      <Grid item>
        <ButtonOne style={{'width':'100px'}} color='primary' onClick={handleBack}>Volver</ButtonOne>
      </Grid>
      </Grid>
    )

}