import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCategories } from "../../store/actions/categories";
import { Link } from "react-router-dom";

const CategoriesAdmin = (props) => {
  useEffect(() => {
    props.getAllCategories();
  }, []);

  if (!props.allCategories) return <> Cargando... </>;

  return (
    <>
      <Link to="/admin/addcategory">
        <button> Agregar </button>
      </Link>
      <Link to="/loginadmin">
        <button> Volver </button>
      </Link>
      {props.allCategories.map((category) => {
        return (
          <div key={category.id}>
            {category.id} - {category.category} 
            <Link to="/admin/modcategory"><button> Editar </button>{" "}</Link>
            <Link to="/admin/delcategory"><button> Eliminar </button>{" "}</Link>
          </div>
        );
      })}
      <Link to="/admin/addcategory">
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
    allCategories: state.allCategories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesAdmin);
