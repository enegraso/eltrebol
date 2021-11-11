import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { prodAdd } from "../../store/actions/products";
import { getAllCategories } from "../../store/actions/categories";

// import { Link } from "react-router-dom";
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { FaUserCircle } from "react-icons/fa";

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

function goBack() {
  window.history.go(-1);
}

const ProductForm = (props) => {

  const dispatch = useDispatch();
  const categoriasAdmin = useSelector((state) => state.Category.allCategories);

  if (categoriasAdmin.length === 0) dispatch(getAllCategories())

  const [input, setInput] = React.useState({
    name: "",
    description: "",
    exist: true,
    price: 0,
    isOfert: false,
    image: "",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
    categories: [],
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
    dispatch(prodAdd(input));
    document.getElementById("form").reset();
    setInput({
      name: "",
      description: "",
      exist: true,
      price: 0,
      isOfert: false,
      image: "",
      units: "unidad",
      minunit: 1,
      stepunit: 1,
      categories: [],
    });
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  function handleChangeSelect(e) {
    var tempera = input.categories.find((temp) => temp === e.target.value);
    console.log(tempera);
    if (!tempera && e.target.value !== "0") {
      let data = [...input.categories];
      data.push(e.target.value);
      setInput({ ...input, categories: data });
      var seltempe = document.getElementById("seleccategory");
      console.log(seltempe);
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      console.log("estas seleccionando:" + data);
    } else alert("La categoría ya fue agregada");
  }

  return (
    // formulario para agregar producto a la tienda
    <div className="boxcontainer">
      <div className="boxteam">
        <div className="titteam">
          <FaUserCircle />
          Agregar producto
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div>
            <select
              name="categories"
              value={input.categories}
              onChange={handleChangeSelect}
              id="seleccategory"
              /* required */
            >
              <option key="0" value="0">
                Categorías del producto{" "}
              </option>
              {categoriasAdmin &&
                categoriasAdmin.map((elem) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.category}
                  </option>
                ))}
            </select>
          </div>
          <div align="center">
            <textarea id="areatempe" readOnly rows="1" cols="35" />
          </div>
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
            <button className='btn btn-light' type="submit">Agregar</button>
          </div>
        </form>
        <button className='btn btn-light' 
          onClick={() => {
            goBack();
          }}
        >
          Volver
        </button>
        <div id="regis" className="logsub">
          {/*  <Link to={linkto}>{texto}</Link> */}
        </div>
      </div>
    </div>
  );
};

/* function mapStateToProps(state) {
  return {
    product: state.productsadmin,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    prodAdd: (product) => dispatch(prodAdd(product)),
  };
} */

export default /* connect(mapStateToProps, mapDispatchToProps) */ProductForm;
