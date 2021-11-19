import React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { prodAdd } from "../../store/actions/products";
import { getAllCategories } from "../../store/actions/categories";
import { FaUserCircle } from "react-icons/fa";
import { Navigate } from 'react-router-dom'
import './products.css'
import swal from 'sweetalert2'

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
    exist: false,
    price: 0,
    isOfert: false,
    image: localStorage.getItem("urlImage").replaceAll('"',''),
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
    swal.fire({
      title: 'Producto ha sido cargado. Deseas cargar otro?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Sí`,
      icon: 'success'
      // denyButtonText: `Cancelar`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        swal.fire('Perfecto!')
        .then(window.history.go(-1))
      } else if (result.isDenied) {
        swal.fire('OK, aquí podras ver producto cargada')
        .then(window.history.go(-2))
      }
    })
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
    <div className="boxform">
      <div>
        <div className="titteam">
          <FaUserCircle />
          Agregar producto
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div className="renglonform">
            <label>Seleccione categoría/s</label>
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
          <div className="renglonform">
            <label>Categorías seleccionadas:</label>
            <textarea id="areatempe" readOnly rows="1" cols="35" />
          </div>
          <div className="renglonform">
            <label>
              Producto            </label>
              <input
                className={errors.name && "danger"}
                type="text"
                placeholder="producto"
                name="name"
                onChange={handleInputChange}
                value={input.name}
              ></input>

            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="renglonform">
            <label>
              Descripción            </label>
              <input
                type="text"
                placeholder="Descripcion"
                name="description"
                onChange={handleInputChange}
                value={input.description}
              ></input>

          </div>
          <div className="renglonform">
            <label>
              Hay stock             </label>
              <input
                type="checkbox"
                name="exist"
                onChange={handleInputChange}
                value={input.exist}
              ></input>
          </div>
          <div className="renglonform">
            <label>
              Precio             </label>
              <input
                className={errors.price && "danger"}
                type="numbre"
                name="price"
                onChange={handleInputChange}
                value={input.price}
              ></input>
            {errors.price && <p className="danger">{errors.price}</p>}
          </div>
          <div className="renglonform">
            <label>
              Es Oferta            </label>
              <input
                type="checkbox"
                name="isofert"
                onChange={handleInputChange}
                value={input.isofert}
              ></input>
           </div>
          <div className="renglonform">
            <label>
              Url Image             </label>
              <input
                type="text"
                name="image"
                onChange={handleInputChange}
                value={input.image}
                readonly
              ></input>
          </div>
          <div className="renglonform">
            <label>
              Tipo de unidad             </label>
              <input
                type="text"
                name="units"
                onChange={handleInputChange}
                value={input.units}
              ></input>
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
 */}          <div className="addback">
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
