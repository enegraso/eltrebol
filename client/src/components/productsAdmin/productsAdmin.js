import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, getProdAdmin } from "../../store/actions/products";
import "./products.css";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md"
import Spinner from "../spinner";

const ProductsAdmin = (props) => {
  useEffect(() => {
    props.getAllProducts();
  }, []);

  if (!localStorage.getItem("userInfo")) return <><Link to='/loginadmin'><h5>Debe estar logueado</h5></Link></>
  
  if (!props.allProducts) return <> <Spinner /> </>;

  return (
    <>
      <div className="listproducts">
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success"> <MdAddCircle /> </button>
          </Link>
          Listado de productos
          <Link to="/loginadmin">
            <button class="btn btn-dark"><MdArrowBack /></button>
          </Link>
        </div>
        {props.allProducts.map((product) => {
          return (
            <div key={product.id} className="mb-3 renglon">
              <div class="form-control">
              <img src={product.image} width='80px' height='80px' />
              </div>
              <div class="form-control textlist">
              {product.name} - $ {product.price} -{" "}
              {product.exist === true ? "hay" : "no hay"}
              </div>
              <div class="form-label addback">
              <Link to={`/admin/modproduct`}>
                <button class="btn btn-success" onClick={ () => props.getProdAdmin(product.id) }><MdEdit /> </button>
              </Link>
              <Link to="/admin/delproduct">
                <button class="btn btn-danger" onClick={ () => props.getProdAdmin(product.id) }><MdDelete /> </button>
              </Link>
              </div>
              
            </div>
          );
        })}
        <div className="addbackhead">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success"><MdAddCircle /> </button>
          </Link>
          Listado de productos
          <Link to="/loginadmin">
            <button class="btn btn-dark"><MdArrowBack /></button>
          </Link>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.Product.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts()),
    getProdAdmin: (id) => dispatch(getProdAdmin(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdmin);
