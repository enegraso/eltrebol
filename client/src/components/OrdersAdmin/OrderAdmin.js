import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { getOrder } from '../../store/actions/orders'

const OrderAdmin = () => {
    const dispatch = useDispatch()
    const pedidoAdmin = useSelector(state => state.Category.orderAdmin)
    // const lineasAdmin = useSelector(state => state.lineasAdmin)
    const params = useParams()

    useEffect(() => {
        dispatch(getOrder(params.id))
        console.log("Pido pedido")
    },[])

    return <>
        {console.log(pedidoAdmin[0])}
       <div>{!pedidoAdmin[0].client ? "No hay pedido" : "Cliente: " + pedidoAdmin[0].client }</div> 
    </>

}

export default OrderAdmin