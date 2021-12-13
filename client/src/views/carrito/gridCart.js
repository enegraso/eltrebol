import React from 'react';
import {useSelector} from 'react-redux';
import Carrito from './index';
import Paso1 from '../../components/checkout/paso1';
import {orderline, total} from '../../components/utils';
//---->Material UI
import Grid from '@mui/material/Grid';
//---------------->

export default function GridCart(){
    const orden = useSelector(state => state.Carrito.guestCart)

    // console.log(orden)
    const guestOrderlines = orderline(orden);

    return(
        <>
        <Grid container spacing={2} p={1}>
          <Grid item xs={12} md={8}>
             <Carrito/>
          </Grid>
          <Grid item xs={12} md={4} alignContent='center' /* direction='column' */>
           <span className='totalview'>Total $: {total(guestOrderlines).toFixed(2).replace(".",",")}</span>
           <Paso1/>
           </Grid>
        </Grid>
        </>
    )
}