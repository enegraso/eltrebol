import React, { useEffect} from 'react'
import { connect } from 'react-redux'
import { getAllProducts } from '../../store/actions/products'

const ProductsAdmin = (props) => {

     useEffect(() => {
        props.getAllProducts()
    },[]) 

    if (!props.getAllProducts) 
        return <> Cargando... </>
 
    return <>
         {props.allProducts.map(product => {
            return <div key={ product.id }>{ product.id } - {product.name} - $ {product.price} - { product.exist === true ? "hay" : "no hay" } <button> Editar </button> <button> Eliminar </button> </div>
         })}
    </>
}

const mapStateToProps = (state) => {
    return {
        allProducts: state.allProducts
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        getAllProducts: () => dispatch(getAllProducts())
    }
}

export default connect (mapStateToProps, mapDispatchToProps)(ProductsAdmin)