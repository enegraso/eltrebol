import React from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { FaUserCircle } from "react-icons/fa";
import { getProdAdmin } from "../../store/actions/products";

export function validateprod(input) {
  var emailPattern = /\S+@\S+\.\S+/; // Expresion Regular para validar Emails.

  let errors = {};
  if (!input.name) {
    errors.name = "Por favor, Ingrese nombre de producto";
  } /* else if (!emailPattern.test(input.username)) {
    errors.username = "Username is invalid";
  } */
  if (!input.price || input.price <= 0) {
    errors.price = "Por favor, ingresar precio para producto";
  }

  return errors;
}

const ProductFormMod = () => {

  const dispatch = useDispatch()
  const productoAdmin = useSelector(state => state.productAdmin)

  

  const [input, setInput] = React.useState({
    name: productoAdmin.name,
    description: productoAdmin.description,
    exist: productoAdmin.exist,
    price: productoAdmin.price,
    isOfert: productoAdmin.isofert,
    image: productoAdmin.image,
    units: productoAdmin.units,
    minunit: productoAdmin.minunit,
    stepunit: productoAdmin.stepunit,
  });

  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    // validate(e.target.name,e.target.value)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validateprod({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    // props.prodAdd(input);
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  return (
    // formulario para agregar producto a la tienda
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Modificar producto
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Producto
              <input
                className={errors.name && "danger"}
                type="text"
                placeholder="producto"
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
            <label>
              Hay stock
              <input
                type="checkbox"
                name="exist"
                onChange={handleInputChange}
                value={input.exist}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Precio
              <input
                className={errors.price && "danger"}
                type="numbre"
                name="price"
                onChange={handleInputChange}
                value={input.price}
              ></input>
            </label>
            {errors.price && <p className="danger">{errors.price}</p>}
          </div>
          <div>
            <label>
              Es Oferta
              <input
                type="checkbox"
                name="isofert"
                onChange={handleInputChange}
                value={input.isofert}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Url Image
              <input
                type="text"
                name="image"
                onChange={handleInputChange}
                value={input.image}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Tipo de unidad
              <input
                type="text"
                name="units"
                onChange={handleInputChange}
                value={input.units}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Minimo de compra
              <input
                type="number"
                name="minunits"
                onChange={handleInputChange}
                value={input.minunit}
              ></input>
            </label>
          </div>
          <div>
            <label>
              Salto de compra
              <input
                type="number"
                name="stepunits"
                onChange={handleInputChange}
                value={input.stepunit}
              ></input>
            </label>
          </div>
          <div>
            <button type="submit">Agregar</button>
          </div>
        </form>
        <div id="regis" className="logsub">
          {/*  <Link to={linkto}>{texto}</Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductFormMod;
