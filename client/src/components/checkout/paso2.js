import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {MainContainer} from '../reutilizables/MainContainer'
import {ButtonOne} from '../reutilizables/Button'
import { REACT_APP_API } from "../../store/consts/consts";

import axios from 'axios';

export default function Paso2(){

  const dispatch = useDispatch();
  const [datos, setDatos] = React.useState("")
  const order = useSelector(state=> state.Order.orderGuest)
  //console.log(order)

 // useEffect(()=>{
    axios
    .post(`${REACT_APP_API}mp/checkout`, order)
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 

 //   },[])
  


  return (
    <MainContainer>
      <table>
        <tr>
          <td></td>
        </tr>
      </table>
      <ButtonOne>Pago</ButtonOne>
    </MainContainer>
  )
}




