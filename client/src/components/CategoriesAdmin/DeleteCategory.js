import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../store/actions/categories";
import './categories.css'

const DeleteCategory = () => {
  const dispatch = useDispatch();
  const cattodelete = useSelector((state) => state.Category.categoryAdminGet);

  if (!cattodelete) return <> Cargando... </>;

  return (
    <>
        <div className='listcategories'>
      <div>Eliminar categoría</div>
      <div>
        Desea eliminar la categoría <span>{cattodelete.category}</span>?
      </div>
      <div className="renglon">
        <button class="btn btn-danger" onClick={() => dispatch(deleteCategory(cattodelete.id))}>
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
