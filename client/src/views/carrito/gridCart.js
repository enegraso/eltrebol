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
        <section id='cart'>
        <Grid container spacing={2} p={1.5}>
          <Grid item xs={12} md={8}>
             <Carrito/>
          </Grid>
          <Grid item xs={12} md={4} alignContent='center'>
           <h5>Total: {total(guestOrderlines).toFixed(2).replace('.',',')}</h5>
           <Paso1/>
           </Grid>
        </Grid>
        </section>
        </>
    )
}