import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getAllOrders, getOrder } from '../../store/actions/orders'
import { Link } from "react-router-dom"
import { MdAttachMoney, MdDeliveryDining, MdMoneyOff } from 'react-icons/md'
import { HiLocationMarker } from "react-icons/hi"
import Spinner from '../spinner'

const OrdersAdmin = (props) => {

     useEffect(() => {
        props.getAllOrders()
    },[]) 

    if (!localStorage.getItem("userInfo")) return <Link to='/loginadmin'><h5>Debe estar logueado</h5></Link>
    
    if (!props.allOrders) return <><Spinner /> </>
 
    return <>
         {props.allOrders.map(order => {
            if (order.status === props.status) {
            if (props.status === "pending")
            return <div key={ order.id }>{order.client} ({order.cellphone}) - $ {order.subtotal} { order.delivery === true ? <MdDeliveryDining /> : <HiLocationMarker /> }{ order.payd === true ? <MdAttachMoney /> : <MdMoneyOff /> }
            <Link to={`/admin/order/${order.id}`}><button className="btn btn-primary" onClick={ () => props.getOrder(order.id) }> Preparar Pedido </button> </Link></div>
            if (props.status === "preparing")
            return <div key={ order.id }>{order.client} ({order.cellphone}) - $ {order.subtotal} { order.delivery === true ? <MdDeliveryDining /> : <HiLocationMarker /> }{ order.payd === true ? <MdAttachMoney /> : <MdMoneyOff /> }
            <Link to={`/admin/orderprocess/${order.id}`}><button className="btn btn-primary" onClick={ () => props.getOrder(order.id) }> Enviar/Retira Pedido </button> </Link></div>
            if (props.status === "prepared")
            return <div key={ order.id }>{order.client} ({order.cellphone}) - $ {order.subtotal} { order.delivery === true ? <MdDeliveryDining /> : <HiLocationMarker /> }{ order.payd === true ? <MdAttachMoney /> : <MdMoneyOff /> }
            <Link to={`/admin/orderdelivered/${order.id}`}><button className="btn btn-primary" onClick={ () => props.getOrder(order.id) }> Terminar Pedido </button> </Link></div>
            if (props.status === "done")
            return <div key={ order.id }>{order.client} ({order.cellphone}) - $ {order.subtotal} { order.delivery === true ? <MdDeliveryDining /> : <HiLocationMarker /> }{ order.payd === true ? <MdAttachMoney /> : <MdMoneyOff /> }
            <Link to={`/admin/order/${order.id}`}><button  className="btn btn-primary" onClick={ () => props.getOrder(order.id) }> Ver Pedido </button> </Link></div>
            }
         })}
    </>
}

const mapStateToProps = (state) => {
    return {
        allOrders: state.Order.allOrders
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrders: () => dispatch(getAllOrders()),
        getOrder: (id) => dispatch(getOrder(id))
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(OrdersAdmin)