import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { orderSuccess } from '../../store/actions/carrito'
import './meli.css'

const Success = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const orderid = localStorage.getItem("orderid")
    const pedido = JSON.parse(localStorage.getItem("order"))
    const [total, setTotal] = useState(0)
    
    useEffect(() => {
        console.log("uso efecto")
        dispatch(orderSuccess())
        localStorage.removeItem("orderid")
        localStorage.removeItem("order")
    },[orderid])
    
    let totalpedido = 0

    return <>
    <h1>Su pedido ha sido realizado exitosamente</h1>
    <table border="1" width="84vw">
          <tr>
            <td className="titleLines">Cantidad</td>
            <td className="titleLines">Producto</td>
            <td className="titleLines">PU</td>
            <td className="titleLines">Importe</td>
          </tr>
    {      
        
        pedido.map((line) => {
            { totalpedido += line.price * line.quantity}
            return <>
              <tr bgcolor="lightgreen" key={line.id}>
                <td>{ line.quantity }</td><td>{ line.name }</td><td>{line.price}</td><td>{line.price * line.quantity }</td>
            </tr>
            </>
            
        })
    }
            </table>
            <div>Importe: {totalpedido} </div>
            <div>Entrega: {pedido.delivery === true ? "Delivery" : "Retiro en sucursal" }</div>
            <div>Pagado: { pedido.payd === true ? "El pedido ha sido pagado" : "El pedido será abonado al recibirlo" }</div>
    <button className="btn btn-success" onClick={() => navigate('/')}> Inicio </button>
    <button className="btn btn-primary" onClick={() => window.print() }> Imprimir </button>
    </>
}

export default Success