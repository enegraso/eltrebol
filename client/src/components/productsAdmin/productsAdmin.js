import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getAllProducts } from "../../store/actions/products";

const ProductsAdmin = (props) => {
  
  useEffect(() => {
    props.getAllProducts();
  }, []);

  if (!props.allProducts) return <> Cargando... </>;

  return (
    <>
      <Link to="/admin/addproduct">
        <button> Agregar </button>
      </Link>
      <Link to="/loginadmin">
        <button> Volver </button>
      </Link>
      {props.allProducts.map((product) => {
        return (
          <div key={product.id}>
            {product.id} - {product.name} - $ {product.price} -{" "}
            {product.exist === true ? "hay" : "no hay"}
            <Link to={`/admin/modproduct/${product.id}`}>
              <button> Editar </button>
            </Link>
            <Link to="/admin/delproduct">
              <button> Eliminar </button>
            </Link>
          </div>
        );
      })}
      <Link to="/admin/addproduct">
        <button> Agregar </button>
      </Link>
      <Link to="/loginadmin">
        <button> Volver </button>
      </Link>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    allProducts: state.allProducts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllProducts: () => dispatch(getAllProducts())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsAdmin);
