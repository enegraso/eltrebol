import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { FaUserCircle } from "react-icons/fa";
import { prodMod } from "../../store/actions/products"
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
      name: productoAdmin.name ,
      description: productoAdmin.description,
      exist: productoAdmin.exist,
      price: productoAdmin.price,
      isOfert: productoAdmin.isOfert,
      image: productoAdmin.image,
      units: productoAdmin.units,
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
    const updProd = {
      id: productoAdmin.id,
      name: input.name ,
      description: input.description,
      exist: input.exist,
      price: input.price,
      isOfert: input.isOfert,
      image: input.image,
      units: input.units,
    }
    console.log(updProd)
    dispatch(prodMod(updProd));
    if (localStorage.getItem("productUpdated") === "true") {
      swal
        .fire({
          title: "Producto momdificado",
          confirmButtonText: `Aceptar`,
          icon: "success",
          // denyButtonText: `Cancelar`,
        })      .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.history.go(-1);
          }
        })
      } else {
          swal
          .fire({
            title: "No se pudo modificar el producto",
            confirmButtonText: `Ok`,
            icon: "error",
            // denyButtonText: `Cancelar`,
          })
      }
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  if (!productoAdmin) return <> Loading... </>;

  return (
    // formulario para agregar producto a la tienda
    <div className="boxform">
      <div>
        <div className="titteam">
          <FaUserCircle />
          Modificar producto
        </div>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Producto </label>
            <input
              class="form-control"
              className={errors.name && "danger"}
              type="text"
              placeholder="producto"
              name="name"
              id="product"
              onChange={handleInputChange}
              value={input.name}
            ></input>

            {errors.name && <p className="danger">{errors.name}</p>}
          </div>
          <div class="mb-3">
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
          <div class="mb-3">
            <label class="form-check-label">Hay stock </label>
            <input
              lass="form-check-input"
              type="checkbox"
              name="exist"
              onChange={handleInputChange}
              value={input.exist}
            ></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Precio</label>
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
          <div class="mb-3">
            <label class="form-check-label">Es Oferta </label>
            <input
              lass="form-check-input"
              type="checkbox"
              name="isofert"
              onChange={handleInputChange}
              value={input.isofert}
            ></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Imagen</label>
            <img class="form-control" src={productoAdmin.image} alt={productoAdmin.name} />
{/*             <input
              class="form-control"
              type="text"
              name="image"
              onChange={handleInputChange}
              value={input.image}
              readOnly
            ></input> */}
          </div>
          <div class="mb-3">
            <label class="form-label">Tipo de unidad </label>
            <input
              class="form-control"
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
 */}{" "}
          <div class="addback">
            <button type="submit" class="btn btn-primary">
              Modificar
            </button>
            <button
              type="reset"
              class="btn btn-secundary"
              onClick={() => {
                window.history.go(-1);
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

export default ProductFormMod;
