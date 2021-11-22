import { useDispatch, useSelector } from "react-redux"
import { deleteProduct } from "../../store/actions/products"
import './products.css'
import swal from 'sweetalert2'
import { Link } from "react-router-dom"


const DeleteProduct = () => {
    const dispatch = useDispatch()
    const prodtodelete = useSelector(state => state.Product.productAdminGet)

    const handleClick = async () => {
        await  dispatch(deleteProduct(prodtodelete.id))
        if (localStorage.getItem("productDeleted") === "true") 
        {
          swal.fire({
           title: 'Se ha borrado exitosamente el producto',
           confirmButtonText: `Ok`,
           icon: 'success'
           // denyButtonText: `Cancelar`,
         }).then((result) => {
           /* Read more about isConfirmed, isDenied below */
           if (result.isConfirmed) {
            window.history.go(-1);
           } 
         }) 
       } else 
       {
          swal.fire({
             title: 'Ops! No se pudo borrar el producto',
             confirmButtonText: `Ok`,
             icon: 'error'
             // denyButtonText: `Cancelar`,
           })
       }
      }

    if (!localStorage.getItem("userInfo")) return <><Link to='/loginadmin'><h5>Debe estar logueado</h5></Link></>


    if (!prodtodelete) return <> Cargando... </>

    return <>
    <div className='listproducts'>
        <div>Eliminar producto</div>
        <div>Desea eliminar el producto <span>{prodtodelete.name}</span>?</div>
        <div className="renglon">
            <button class="btn btn-danger" onClick={handleClick}> SI </button><button class="btn btn-link" onClick={ () => { window.history.go(-1); }}> NO </button></div>
        </div>
    </>

}

export default DeleteProduct