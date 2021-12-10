import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { prodAdd } from "../../store/actions/products";
import { getAllCategories } from "../../store/actions/categories";
import { FaUserCircle } from "react-icons/fa";
import "./products.css";
import swal from "sweetalert2";
import { Link } from "react-router-dom";

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

const ProductForm = () => {
  const dispatch = useDispatch();
  const categoriasAdmin = useSelector((state) => state.Category.allCategories);

  useEffect(()=>{
    if (categoriasAdmin.length === 0) dispatch(getAllCategories());
  },[])
  
  
  const [input, setInput] = React.useState({
    name: "",
    description: "",
    exist: false,
    price: 0,
    isOfert: false,
    image: localStorage.getItem("urlImage").replaceAll('"', ""),
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

  async function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    console.log(input);
    await dispatch(prodAdd(input));
    if (localStorage.getItem("productAdded") === "true") {
      swal
        .fire({
          title: "Producto ha sido cargado. Deseas cargar otro?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: `Sí`,
          icon: "success",
          // denyButtonText: `Cancelar`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.history.go(-1);
          } else if (result.isDenied) {
            window.history.go(-2);
          }
        });
    } else {
      swal.fire({
        title: localStorage.getItem("productAdded"),
        confirmButtonText: `Aceptar`,
        icon: "error",
        // denyButtonText: `Cancelar`,
      });
    }
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

  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

  return (
    // formulario para agregar producto a la tienda
    <div className="boxform">
      <div>
        <div className="titteam">
          <FaUserCircle />
          Agregar producto
        </div>
        <form onSubmit={handleSubmit} id="form">
          <div class="mb-3">
            <h4>Paso 2</h4>
            Datos del producto
          </div>
          <div class="mb-3">
            <label class="form-label">Seleccione categoría/s</label>
            <select
              class="form-select"
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
          <div class="mb-3">
            <label class="mb-3">Categorías seleccionadas:</label>
            <textarea
              class="form-control"
              id="areatempe"
              readOnly
              rows="1"
              cols="35"
            />
          </div>
          <div className="mb-3">
            <label class="form-label">Producto </label>
            <input
              class="form-control"
              className={errors.name && "danger"}
              type="text"
              placeholder="producto"
              name="name"
              onChange={handleInputChange}
              value={input.name}
            ></input>
            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div className="mb-3">
            <label class="form-label">Descripción </label>
            <input
              class="form-control"
              type="text"
              placeholder="Descripcion"
              name="description"
              onChange={handleInputChange}
              value={input.description}
            ></input>
          </div>
          <div className="mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              name="exist"
              onChange={handleInputChange}
              value={input.exist}
            ></input>
            <label class="form-check-label">Hay stock</label>
          </div>
          <div className="mb-3">
            <label class="form-label">Precio </label>
            <input
              class="form-control"
              className={errors.price && "danger"}
              type="numbre"
              name="price"
              onChange={handleInputChange}
              value={input.price}
            ></input>
            {errors.price && <p className="danger">{errors.price}</p>}
          </div>
          <div className="mb-3">
            <input
              class="form-check-input"
              type="checkbox"
              name="isofert"
              onChange={handleInputChange}
              value={input.isofert}
            ></input>
            <label class="form-check-label">Es Oferta </label>{" "}
          </div>
          <div className="mb-3">
            <label class="form-label">Imagen</label>
            <img class="form-control" src={input.image} alt={input.name} />
            {/*             <input
              class="form-control"
              type="text"
              name="image"
              onChange={handleInputChange}
              value={input.image}
              readOnly
            ></input> */}
          </div>
          <div className="mb-3">
            <label class="form-label">Tipo de unidad </label>
            <input
              class="form-control"
              type="text"
              name="units"
              onChange={handleInputChange}
              value={input.units}
            ></input>
          </div>
          <div>
            <label class="form-label">Minimo de compra </label>
            <input
              class="form-control"
              type="number"
              name="minunit"
              onChange={handleInputChange}
              value={input.minunit}
              step={0.250}
              min={0.250}
              max={100}
            ></input>
          </div>
          <div>
            <label class="form-label">Salto de compra</label>
            <input
              class="form-control"
              type="number"
              name="stepunit"
              max={1}
              step={0.250}
              min={0.250}
              onChange={handleInputChange}
              value={input.stepunit}
            ></input>
          </div>{" "}
          <div className="addback">
            <button className="btn btn-success" type="submit">
              Agregar
            </button>
            <button
              className="btn btn-secondary"
              type="reset"
              onClick={() => {
                window.history.go(-2);
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

export default /* connect(mapStateToProps, mapDispatchToProps) */ ProductForm;
