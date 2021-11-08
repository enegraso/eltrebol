import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getAllOrders } from '../../store/actions/orders'

const OrdersAdmin = (props) => {

     useEffect(() => {
        props.getAllOrders()
    },[]) 

    if (!props.allOrders) return <> Cargando...</>
 
    return <>
         {props.allOrders.map(order => {
            if (order.status === props.status)
            return <div key={ order.id }>{ order.id } - {order.client} ({order.cellphone}) - $ {order.subtotal} <button> Pedido </button> </div>
         })}
    </>
}

const mapStateToProps = (state) => {
    return {
        allOrders: state.allOrders
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllOrders: () => dispatch(getAllOrders())
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(OrdersAdmin)