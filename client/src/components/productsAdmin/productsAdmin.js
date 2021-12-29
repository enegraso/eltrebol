import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  getAllProductsAdmin,
  getProdAdmin,
  prodStock,
  sort,
  sortweight,
  ASC,
  DES,
  PASC,
  PDES,
  filtroCate,
  sortExist
} from "../../store/actions/products";
import { getAllCategories } from "../../store/actions/categories";
import "./products.css";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Spinner from "../spinner";
import SearchBarAdmin from "../searchBarAdmin";

import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Avatar } from "@mui/material";
/* import Avatar from '@mui/material/Avatar'; */

const ProductsAdmin = (props) => {
  const [input, setInput] = useState({});

  useEffect(() => {
    if (!props.allProducts.length) {
    props.getAllProductsAdmin();
    props.getAllCategories(); 
    } else {
      props.sortExist(DES, props.allProducts)
    }
  }, []);

  /*  Handle para Ordenar las categorías */
  function handleDispatchOrder(event) {
    console.log(event, props.allProducts);
    if (event.target.value === ASC || event.target.value === DES) {
      props.sort(event.target.value, props.allProducts);
    }
    if (event.target.value === PASC || event.target.value === PDES) {
      props.sortweight(event.target.value, props.allProducts);
    }
  }

  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

  if (!props.allProducts.length)
    return (
      <>
        <div style={{ marginTop: "200px" }}>
        <Spinner />
        </div>
      </>
    );

  // producto visible o no
  const handleClick = async (id) => {
    await props.prodStock(id);
  };

  // Filtrar productos por categoría
  const handleDispatchCate = (e) => {
    // si hay valor en categoría hago el filtro
    if (e.target.value) {
      props.filtroCate(props.filtrada, e.target.value);
    }
    // si no hay valor tomo todas los productos
    else {
      
      props.getAllProductsAdmin();
    }
  };

  return (
    <>
      <div className="listproducts">
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button className="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          <div className="filtroscss">
            <SearchBarAdmin />

            {/* ordenar productos */}
            <select onChange={handleDispatchOrder}>
              <option>Ordenar</option>
              <option value={ASC}>Producto ASC</option>
              <option value={DES}>Producto DESC</option>
              <option value={PASC}>Precio ASC</option>
              <option value={PDES}>Precio DESC</option>
            </select>
            {/*  Filtrar por categoría */}
            <select
              name="nameTempe"
              value={input.nameTempe}
              onChange={handleDispatchCate}
            >
              <option value="">Categorías</option>

              {
                /* console.log(props.categories), */
                props.categories &&
                  props.categories.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.category}
                    </option>
                  ))
              }
            </select>
          </div>
          <Link to="/loginadmin">
            <button className="btn btn-dark">
              <MdArrowBack />
            </button>
          </Link>
        </div>
        {props.allProducts.map((product) => {
          return (
            <Grid item xs={12} /* md={12}  */p={0.3} key={product.id}>
              <Paper elevation={3} rounded="false" /* className="paper-prod" */>
                <Grid
                  container
                  direction="row"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  <Grid item xs={3} alignItems="center">
                  <Avatar src={product.image} alt={product.name} sx={{ width: 56, height: 56 }}
                  />
                  </Grid>
                  <Grid item xs={6}>
                    {product.name} <br /> $ { product.price.toFixed(2).replace(".",",") } <br />
                    {product.exist === true ? " STOCK " : " SIN STOCK "}
                  </Grid>
                  <Grid item xs={3}>
                    <div className="addback">
                      <button
                        className={
                          product.exist === true
                            ? "btn btn-danger"
                            : "btn btn-success"
                        }
                        onClick={() => {
                          handleClick(product.id);
                        }}
                      >
                        {product.exist === true ? (
                          <AiOutlineEyeInvisible />
                        ) : (
                          <AiOutlineEye />
                        )}
                      </button>
                      <Link to={`/admin/modproduct`}>
                        <button
                          class="btn btn-success"
                          onClick={() => props.getProdAdmin(product.id)}
                        >
                          <MdEdit />{" "}
                        </button>
                      </Link>
                      <Link to="/admin/delproduct">
                        <button
                          class="btn btn-danger"
                          onClick={() => props.getProdAdmin(product.id)}
                        >
                          <MdDelete />{" "}
                        </button>
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          );
        })}
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button className="btn btn-success">
              <MdAddCircle />{" "}
            </button>
          </Link>
          <div className="filtroscss">
            <SearchBarAdmin />
            <select onChange={handleDispatchOrder}>
              <option>Ordenar</option>
              <option value={ASC}>Producto ASC</option>
              <option value={DES}>Producto DESC</option>
              <option value={PASC}>Precio ASC</option>
              <option value={PDES}>Precio DESC</option>
            </select>
            {/*  Filtrar por categoría */}
            <select
              name="nameTempe"
              value={input.nameTempe}
              onChange={handleDispatchCate}
            >
              <option value="">Categorías</option>

              {
                /* console.log(props.categories), */
                props.categories &&
                  props.categories.map((elem) => (
                    <option key={elem.id} value={elem.id}>
                      {elem.category}
                    </option>
                  ))
              }
            </select>
          </div>
          <Link to="/loginadmin">
            <button className="btn btn-dark">
              <MdArrowBack />
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.Product.productsAdmin,
    categories: state.Category.allCategories,
    filtrada: state.Product.auxProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductsAdmin: () => dispatch(getAllProductsAdmin()),
    getProdAdmin: (id) => dispatch(getProdAdmin(id)),
    prodStock: (prod) => dispatch(prodStock(prod)),
    sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
    sortweight: (elem1, elem2) => dispatch(sortweight(elem1, elem2)),
    getAllCategories: () => dispatch(getAllCategories()),
    filtroCate: (elem1, elem2) => dispatch(filtroCate(elem1, elem2)),
    sortExist: (elem1, elem2) => dispatch(sortExist(elem1, elem2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdmin);
