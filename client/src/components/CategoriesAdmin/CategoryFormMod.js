import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../../store/actions/categories";
import swal from "sweetalert2"
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { FaUserCircle } from "react-icons/fa";

export function validatecate(input) {
  var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.

  let errors = {};
  if (!input.name) {
    errors.name = "Por favor, Ingrese nombre de categoría";
  }
  return errors;
}

function goBack() {
  window.history.go(-1);
}

const CategoryFormMod = () => {

  const dispatch = useDispatch()
  const cateAdmin = useSelector((state) => state.Category.categoryAdminGet)


  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    // validate(e.target.name,e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validatecate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  async function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    const updCate = {
      id: cateAdmin.id,
      category: cateAdmin.category,
      description: cateAdmin.description
    }

    await dispatch(updateCategory(updCate))
     if (localStorage.getItem("categoryUpdated") === "true") 
     {
       swal.fire({
        title: 'Genial! La categoría ha sido cargada. Deseas cargar otra?',
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: 'success'
        // denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          setInput({name: "",
          description: ""})
        } else if (result.isDenied) {
         window.location.href='/admin/categories'
        }
      }) 
    } else 
    {
       swal.fire({
          title: 'Ops! No se pudo modificar la categoría',
          confirmButtonText: `Ok`,
          icon: 'error'
          // denyButtonText: `Cancelar`,
        })
    }
  }

  console.log(cateAdmin)
  const [input, setInput] = React.useState({
    name: cateAdmin.category,
    description: cateAdmin.description
  });

  if (!cateAdmin) return <> Cargando... </>

  return (
    // formulario para agregar producto a la tienda
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Modificar categoría
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Categoría
              <input
                className={errors.name && "danger"}
                type="text"
                placeholder="categoría"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              ></input>
            </label>
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div>
            <label>
              Descripción
              <input
                type="text"
                placeholder="Descripcion"
                name="description"
                onChange={handleInputChange}
                value={input.description}
              ></input>
            </label>
          </div>
          <div>
            <button className="btn btn-success" type="submit">
              Modificar
            </button>
            <button
              className="btn btn-secondary"
              type="reset"
              onClick={() => {
                goBack();
              }}
            >
              Volver
            </button>
          </div>
        </form>
        <div id="regis" className="logsub">
          {/*  <Link to={linkto}>{texto}</Link> */}
        </div>
      </div>
    </div>
  );
};

export default CategoryFormMod;
