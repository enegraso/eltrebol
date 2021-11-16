import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, getProdAdmin } from "../../store/actions/products";
import "./products.css";
import { BiEdit } from "react-icons/bi";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md"

const ProductsAdmin = (props) => {
  useEffect(() => {
    props.getAllProducts();
  }, []);

  if (!props.allProducts) return <> Cargando... </>;

  return (
    <>
      <div className="listproducts">
        <div className="addback">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success"> <MdAddCircle /> </button>
          </Link>
          <Link to="/loginadmin">
            <button class="btn btn-dark"><MdArrowBack /></button>
          </Link>
        </div>
        {props.allProducts.map((product) => {
          return (
            <div key={product.id} className="renglon">
              <div>
              <img src={product.image} width='64px' height='64px' />
              {product.name} - $ {product.price} -{" "}
              {product.exist === true ? "hay" : "no hay"}
              </div>
              <div>
              <Link to={`/admin/modproduct/${product.id}`}>
                <button class="btn btn-success" onClick={ () => props.getProdAdmin(product.id) }><MdEdit /> </button>
              </Link>
              <Link to="/admin/delproduct">
                <button class="btn btn-danger" onClick={ () => props.getProdAdmin(product.id) }><MdDelete /> </button>
              </Link>
              </div>
              
            </div>
          );
        })}
        <div className="addback">
          <Link to="/admin/addimageprod">
            <button class="btn btn-success"><MdAddCircle /> </button>
          </Link>
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
