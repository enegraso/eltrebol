import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getAllOrders, getOrder } from '../../store/actions/orders'
import { Link } from "react-router-dom"

const OrdersAdmin = (props) => {

     useEffect(() => {
        props.getAllOrders()
    },[]) 

    if (!props.allOrders) return <> Cargando...</>
 
    return <>
         {props.allOrders.map(order => {
            if (order.status === props.status)
            return <div key={ order.id }>{ order.id } - {order.client} ({order.cellphone}) - $ {order.subtotal} 
            <Link to={`/admin/order/${order.id}`}><button onClick={ () => props.getOrder(order.id) }> Pedido </button> </Link></div>
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