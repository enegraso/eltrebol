import { useDispatch, useSelector } from "react-redux"
import { deletecategory } from "../../store/actions/categories"


const DeleteCategory = () => {
    const dispatch = useDispatch()
    const cattodelete = useSelector(state => state.Category.categoryAdminGet)

    if (!cattodelete) return <> Cargando... </>

    return <>
        <div>Eliminar producto</div>
        <div>Desea eliminar la categoría <span>{cattodelete.category}</span>?</div>
        <div><button onClick={ () => dispatch( deletecategory(cattodelete.id)) }> SI </button><button> NO </button></div>
    </>

}

export default DeleteCategory