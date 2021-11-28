import React, { useEffect } from "react";
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
} from "../../store/actions/products";
import "./products.css";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Spinner from "../spinner";
import SearchBarAdmin from "../searchBarAdmin";

const ProductsAdmin = (props) => {
  useEffect(() => {
    props.getAllProductsAdmin();
  }, []);

      /*  Handle para Ordenar las razas */
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

  if (!props.allProducts)
    return (
      <>
        {" "}
        <Spinner />{" "}
      </>
    );

 
    const handleClick = async (id) => {
      await props.prodStock(id);
      await props.getAllProductsAdmin();
    };
 
    return (
    <>
      <div className="listproducts">
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          <SearchBarAdmin />       

          <select onChange={handleDispatchOrder}>
          <option>Ordenar</option>
          <option value={ASC}>Producto ASC</option>
          <option value={DES}>Producto DESC</option>
          <option value={PASC}>Precio ASC</option>
          <option value={PDES}>Precio DESC</option>
        </select>

          <Link to="/loginadmin">
            <button class="btn btn-dark">
              <MdArrowBack />
            </button>
          </Link>
        </div>
        {props.allProducts.map((product) => {
          return (
            <div key={product.id} className="mb-3 renglon">
              <div class="form-control">
                <img src={product.image} width="80px" height="80px" />
              </div>
              <div class="form-control textlist">
                {product.name} - AR$ {product.price} - 
                {product.exist === true ? " STOCK " : " SIN STOCK "}
              </div>
              <div class="form-label addback">
                <button
                  className={
                    product.exist === true
                      ? "btn btn-danger"
                      : "btn btn-success"
                  }
                  onClick={() => {handleClick(product.id)}}
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
            </div>
          );
        })}
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success">
              <MdAddCircle />{" "}
            </button>
          </Link>
          <SearchBarAdmin />
          <select onChange={handleDispatchOrder}>
          <option>Ordenar</option>
          <option value={ASC}>Producto ASC</option>
          <option value={DES}>Producto DESC</option>
          <option value={PASC}>Precio ASC</option>
          <option value={PDES}>Precio DESC</option>
        </select>
          <Link to="/loginadmin">
            <button class="btn btn-dark">
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProductsAdmin: () => dispatch(getAllProductsAdmin()),
    getProdAdmin: (id) => dispatch(getProdAdmin(id)),
    prodStock: (prod) => dispatch(prodStock(prod)),
    sort: (elem1, elem2) => dispatch(sort(elem1, elem2)),
    sortweight: (elem1, elem2) => dispatch(sortweight(elem1, elem2)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdmin);
