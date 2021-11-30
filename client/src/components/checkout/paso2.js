import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {MainContainer} from '../reutilizables/MainContainer'
import {ButtonOne} from '../reutilizables/Button'
import { REACT_APP_API } from "../../store/consts/consts";
import axios from 'axios';
import PruebaCheckout from '../pruebaCheckout/pruebaCheckout';
import { useNavigate } from 'react-router-dom'



export default function Paso2(){

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datos, setDatos] = React.useState("")
  const order = JSON.parse(localStorage.getItem("order"));
  const orderid = localStorage.getItem("orderId");
  const orden = useSelector(state => state.Carrito.guestCart);
  //console.log(order)

  useEffect( ()=>{
  
    const objCheck = {
      id: orderid,
      carrito: order // hardcodeada, tomar el valor correspondiente
    }
   
     axios
    .post(`${REACT_APP_API}mp/checkout`, objCheck)
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err))
  },[])

  return (
    <MainContainer>
    <div>
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <PruebaCheckout productos={order} data={datos}/> /* PruebaCheckout se debe cambiar (copiar/cambiar nombre) en componente propio */
      }
    </div>
    <button onClick={() => navigate('/') }> Volver </button>
   {/*    <ButtonOne>Pago</ButtonOne> */}
    </MainContainer>
  )
}




