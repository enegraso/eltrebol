import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { FaUserCircle } from "react-icons/fa";
/* import { getProdAdmin } from "../../store/actions/products"; */
import swal from "sweetalert2";

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
  const dispatch = useDispatch();
  const productoAdmin = useSelector((state) => state.Product.productAdminGet);
  const [errors, setErrors] = React.useState({});

  const [input, setInput] = React.useState({
    name: "",
    description: "",
    exist: "",
    price: "",
    isOfert: "",
    image: "",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
    categories: [],
  });

  useEffect(() => {
    setInput({
      name: productoAdmin.name,
      description: productoAdmin.description,
      exist: productoAdmin.exist,
      price: productoAdmin.price,
      isOfert: productoAdmin.isOfert,
      image: productoAdmin.image,
      units: productoAdmin.unit,
      minunit: 1,
      stepunit: 1,
      categories: [],
    });
    console.log("PRODUCTOADMIN", productoAdmin);
  }, [productoAdmin]);

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

  if (!productoAdmin) return <> Loading... </>; 

  return (
    // formulario para agregar producto a la tienda
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Modificar producto
        </div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label>
              Producto
              <input
                className={errors.name && "danger"}
                type="text"
                placeholder="producto"
                name="name"
                id="product"
                onChange={handleInputChange}
                value={input.name}
              ></input>
            </label>
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div class="mb-3">
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
          <div class="mb-3">
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
          <div class="mb-3">
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
          <div class="mb-3">
            <label>Es Oferta </label>
            <input
              type="checkbox"
              name="isofert"
              onChange={handleInputChange}
              value={input.isofert}
            ></input>
          </div>
          <div class="mb-3">
            <label>
              Url Image
              <input
                type="text"
                name="image"
                onChange={handleInputChange}
                value={input.image}
                readOnly
              ></input>
            </label>
          </div>
          <div class="mb-3">
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
          {/*           <div>
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
 */}{" "}
          <div class='addback'>
            <button type="submit" class="btn btn-primary">Modificar</button>
            <button type="reset" class="btn btn-secundary" onClick={() => { window.history.go(-1) }}>Volver</button>
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
