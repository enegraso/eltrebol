import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts, getProdAdmin } from "../../store/actions/products";
import "./products.css";

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
            <button> Agregar </button>
          </Link>
          <Link to="/loginadmin">
            <button> Volver </button>
          </Link>
        </div>
        {props.allProducts.map((product) => {
          return (
            <div key={product.id}>
              {product.id} - {product.name} - $ {product.price} -{" "}
              {product.exist === true ? "hay" : "no hay"}
              <Link to={`/admin/modproduct/${product.id}`}>
                <button onClick={ () => props.getProdAdmin(product.id) }> Editar </button>
              </Link>
              <Link to="/admin/delproduct">
                <button onClick={ () => props.getProdAdmin(product.id) }> Eliminar </button>
              </Link>
            </div>
          );
        })}
        <div className="addback">
          <Link to="/admin/addimageprod">
            <button> Agregar </button>
          </Link>
          <Link to="/loginadmin">
            <button> Volver </button>
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
