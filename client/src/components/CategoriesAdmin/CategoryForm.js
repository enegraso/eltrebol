import React from "react";
import { connect } from "react-redux";
import { cateAdd } from "../../store/actions/categories";
import { Navigate } from "react-router-dom";
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

const CategoryForm = (props) => {
    
  const [input, setInput] = React.useState({
    name: "",
    description: "",
  });
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

  function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    props.cateAdd(input);
    
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  return (
    // formulario para agregar producto a la tienda
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Agregar categoría
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
          <button className='btn btn-success' type="submit">Agregar</button>
            <button className='btn btn-secondary' type="reset"
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

function mapStateToProps(state) {
  return {
    category: state.Category.categoriesAdmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    cateAdd: (category) => dispatch(cateAdd(category)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryForm);