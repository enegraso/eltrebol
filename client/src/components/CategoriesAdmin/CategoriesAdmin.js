import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCategories, getCateAdmin } from "../../store/actions/categories";
import { Link } from "react-router-dom";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md";
import "./categories.css";

const CategoriesAdmin = (props) => {

  useEffect(() => {
    props.getAllCategories();
  }, []);

  if (!localStorage.getItem("userInfo")) return <Link to='/loginadmin'><h5>Debe estar logueado</h5></Link>
  
  if (!props.allCategories) return <> Cargando... </>;

  return (
    <>
      <div className="listproducts">
        <div className="addbackhead">
          <Link to="/admin/addcategory">
            <button class="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          Listado de categorías
          <Link to="/loginadmin">
            <button class="btn btn-dark">
              <MdArrowBack />
            </button>
          </Link>
        </div>
        {props.allCategories.map((category) => {
          return (
            <div key={category.id} class="mb-3 renglon">
              <div class="form-control">
              {category.category}
              </div>
              <div class="form-label addback">
              <Link to="/admin/modcategory">
              <button class="btn btn-success" onClick={ () => { props.getCateAdmin(category.id) } }><MdEdit /> </button>
              </Link>
              <Link to="/admin/delcategory">
              <button class="btn btn-danger" onClick={ () => props.getCateAdmin(category.id) }><MdDelete /> </button>
              </Link>
              </div>
            </div>
          );
        })}
        <div className="addbackhead">
          <Link to="/admin/addcategory">
            <button class="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          Listado de categorías
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
    allCategories: state.Category.allCategories,
    categoryAdminGet: state.Category.categoryAdminGet
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    getCateAdmin: (id) => dispatch(getCateAdmin(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesAdmin);
