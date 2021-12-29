import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import "./login.css";
// import Dashboard from '../../views/admin/dashboard'
import { getAllCategories } from "../../store/actions/categories";
import { FaUserCircle } from "react-icons/fa";
import { prodMod } from "../../store/actions/products";
import swal from "sweetalert2";

export function validateprod(input) {
  /* var emailPattern = /\S+@\S+\.\S+/; */ // Expresion Regular para validar Emails.

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

let data = []

const ProductFormMod = () => {
  const dispatch = useDispatch();
  const productoAdmin = useSelector((state) => state.Product.productAdminGet);
  const categoriasAdmin = useSelector((state) => state.Category.allCategories);
  const [errors, setErrors] = React.useState({});



  const [input, setInput] = React.useState({
    name: "",
    description: "",
    exist: false,
    price: "",
    isofert: false,
    image: "",
    units: "unidad",
    minunit: 1,
    stepunit: 1,
    categories: [],
  });

  useEffect(() => {
    document.getElementById("exist").checked = productoAdmin.exist;
    document.getElementById("isofert").checked = productoAdmin.isOfert;
    console.log("PRODUCTOADMIN", productoAdmin.isOfert);
    if (categoriasAdmin.length === 0) dispatch(getAllCategories());
    const categs = []
    const nomcategs = []
    productoAdmin.categories && productoAdmin.categories.map((cate) => {
      categs.push(cate.id)
      nomcategs.push(cate.category)
    })
    data = categs
    document.getElementById("areatempe").value = nomcategs;
    setInput({
      name: productoAdmin.name,
      description: productoAdmin.description,
      exist: productoAdmin.exist,
      price: productoAdmin.price,
      isofert: productoAdmin.isOfert,
      image: productoAdmin.image,
      units: productoAdmin.units,
      minunit: productoAdmin.minunit,
      stepunit: productoAdmin.stepunit,      
      categories: data,
    });

    console.log("Initial data",data)
    console.log("initial input categories",input.categories)
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

  async function handleSubmit(e) {
    // funcion que debe solicitar usuario logueado
    e.preventDefault();
    const updProd = {
      id: productoAdmin.id,
      name: input.name,
      description: input.description,
      exist: input.exist,
      price: input.price,
      isOfert: input.isofert,
      image: input.image,
      units: input.units,
      minunit: input.minunit,
      stepunit: input.stepunit,      
      categories: input.categories,
    };
    console.log(updProd);
    await dispatch(prodMod(updProd));
    if (localStorage.getItem("productUpdated") === "true") {
      swal
        .fire({
          title: "Producto modificado",
          confirmButtonText: `Aceptar`,
          icon: "success",
          // denyButtonText: `Cancelar`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            window.history.go(-1);
          }
        });
    } else {
      // console.log("Que corno traigo",localStorage.getItem("productUpdated"))
      swal.fire({
        title: localStorage.getItem("productUpdated"),
        confirmButtonText: `Ok`,
        icon: "error",
        // denyButtonText: `Cancelar`,
      });
    }
    // console.log(props.userDetail+"     "+localStorage.getItem("userInfo"))
  }

  function handleChangeSelect(e) {
    var tempera = input.categories.find((temp) => temp === e.target.value);
    console.log(tempera);
    if (!tempera && e.target.value !== "0") {
      // data = [...input.categories];
      data.push(e.target.value);
      setInput({ ...input, categories: data });
      var seltempe = document.getElementById("seleccategory");
      console.log("SELTEMPE",seltempe);
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      console.log("estas seleccionando:" + data);
      console.log("Agrego data",data)
      console.log("Agrego input categories",input.categories)
    } else alert("La categoría ya fue agregada");
  }

  const handleClick = () => {
    console.log("DATA",data)
    let eliminado = data.pop()
    console.log("Elimine",eliminado)
    var artempes = document.getElementById("areatempe");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenarea = artempes.value.split(",");
    textoenarea.pop()
    console.log("Text area",textoenarea)
     artempes.value = textoenarea
     console.log(input.categories)
     console.log("Quito data",data)
     console.log("Quito quito categories",input.categories)
  }

  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

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
        <div classNames="mb-3">
            <label className="form-label">Seleccione categoría/s</label>
            <select
              className="form-select"
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
          <div className="mb-3">
            <label className="mb-3">Categorías seleccionadas:</label>
            <textarea
              className="form-control"
              id="areatempe"
              readOnly
              rows="1"
              cols="35"
            /><div className="btn btn-outline-success searchbut" onClick={handleClick}> borrar </div>
          </div>
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
              id="exist"
              class="form-check-input"
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
              id="isofert"
              class="form-check-input"
              type="checkbox"
              name="isofert"
              onChange={handleInputChange}
              value={input.isofert}
            ></input>
          </div>
          <div class="mb-3">
            <label class="form-label">Imagen</label>
            <img
              class="form-control"
              src={productoAdmin.image}
              alt={productoAdmin.name}
            />
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
             /*  max={100} */
            ></input>
          </div>
          <div>
            <label class="form-label">Salto de compra</label>
            <input
              class="form-control"
              type="number"
              name="stepunit"
              /* max={1} */
              step={0.250}
              min={0.250}
              onChange={handleInputChange}
              value={input.stepunit}
            ></input>
          </div>{" "}
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
