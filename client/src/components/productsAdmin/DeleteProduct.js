import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../store/actions/products"


const DeleteProduct = () => {
    const dispatch = useDispatch()
    const prodtodelete = useSelector(state => state.Product.productAdminGet)

    if (!prodtodelete) return <> Cargando... </>

    return <>
        <div>Eliminar producto</div>
        <div>Desea eliminar el producto <span>{prodtodelete.name}</span>?</div>
        <div><button onClick={ () => dispatch(deleteProduct(prodtodelete.id)) }> SI </button><button> NO </button></div>
    </>

}

export default DeleteProduct