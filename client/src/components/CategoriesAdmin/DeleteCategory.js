import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/actions/categories";
import './categories.css'
import swal from 'sweetalert2'

const DeleteCategory = () => {
  const dispatch = useDispatch();
  const cattodelete = useSelector((state) => state.Category.categoryAdminGet);

  const handleClick = async () => {
    await dispatch(deleteCategory(cattodelete.id))
    if (localStorage.getItem("categoryDeleted") === "true") 
    {
      swal.fire({
       title: 'Se ha borrado exitosamente la categoría',
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
         title: 'Ops! No se pudo borrar la categoría',
         confirmButtonText: `Ok`,
         icon: 'error'
         // denyButtonText: `Cancelar`,
       })
   }
  }

  if (!cattodelete) return <> Cargando... </>;

  return (
    <>
        <div className='listcategories'>
      <div>Eliminar categoría</div>
      <div>
        Desea eliminar la categoría <span>{cattodelete.category}</span>?
      </div>
      <div className="renglon">
        <button class="btn btn-danger" onClick={handleClick}>
          {" "}
          SI{" "}
        </button>
        <button class="btn btn-link"> NO </button>
      </div>
      </div>
    </>
  );
};

export default DeleteCategory;
