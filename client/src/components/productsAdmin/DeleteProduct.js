import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../store/actions/products"
import './products.css'


const DeleteProduct = () => {
    const dispatch = useDispatch()
    const prodtodelete = useSelector(state => state.Product.productAdminGet)

    if (!prodtodelete) return <> Cargando... </>

    return <>
    <div className='listproducts'>
        <div>Eliminar producto</div>
        <div>Desea eliminar el producto <span>{prodtodelete.name}</span>?</div>
        <div className="renglon">
            <button class="btn btn-danger" onClick={ () => dispatch(deleteProduct(prodtodelete.id)) }> SI </button><button class="btn btn-link"> NO </button></div>
        </div>
    </>

}

export default DeleteProduct