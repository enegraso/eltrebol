import './index.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import PruebaCheckout from './pruebaCheckout'
import { REACT_APP_API } from "../../store/consts/consts";

function ProbarPago() {
  const [datos, setDatos] = useState("")
  let order = {}

  const productos = [
    {title: "Producto prueba 1", quantity: 3, price: 1.00},
    {title: "Producto prueba 2", quantity: 2, price: 2.00},
  ]

 order = {
      id: 2,
      carrito: productos
  }

  console.log(order)
  useEffect(()=>{
    axios
    .post(`${REACT_APP_API}mp/checkout`,{order})
    .then((data)=>{
      setDatos(data.data)
      console.info('Contenido de data:', data)
    })
    .catch(err => console.error(err)) 
  },[])

  return (
    <div className="App">
      { !datos
        ? <p>Aguarde un momento....</p> 
        : <PruebaCheckout productos={productos} data={datos}/>
      }
    </div>
  );
}

export default ProbarPago;