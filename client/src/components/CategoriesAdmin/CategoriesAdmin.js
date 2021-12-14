import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllCategories, getCateAdmin } from "../../store/actions/categories";
import { Link } from "react-router-dom";
import { MdAddCircle, MdEdit, MdDelete, MdArrowBack } from "react-icons/md";
import "./categories.css";
import Spinner from "../spinner";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const CategoriesAdmin = (props) => {
  useEffect(
    () => {
      props.getAllCategories();
    } /* , [] */
  );

  if (!localStorage.getItem("userInfo"))
    return (
      <Link to="/loginadmin">
        <h5>Debe estar logueado</h5>
      </Link>
    );

  if (!props.allCategories)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <>
      <div className="listproducts">
        <div className="addbackhead">
          <Link to="/admin/addcategory">
            <button className="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          Listado de categorías
          <Link to="/loginadmin">
            <button className="btn btn-dark">
              <MdArrowBack />
            </button>
          </Link>
        </div>
        {props.allCategories.map((category) => {
          return (
            <Grid item xs={12} md={12} p={0.5} key={category.id}>
              <Paper elevation={2} rounded="true" /* className="paper-prod" */>
                <Grid
                  container
                  direction="row"
                   justifyContent="space-around"
                  alignItems="center"
                 >
                  <Grid item >{category.category}</Grid>
                  <Grid item >
                    <div className="addback">
                    <Link to="/admin/modcategory">
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          props.getCateAdmin(category.id);
                        }}
                      >
                        <MdEdit />{" "}
                      </button>
                    </Link>
                    <Link to="/admin/delcategory">
                      <button
                        className="btn btn-danger"
                        onClick={() => props.getCateAdmin(category.id)}
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
          <Link to="/admin/addcategory">
            <button className="btn btn-success">
              {" "}
              <MdAddCircle />{" "}
            </button>
          </Link>
          Listado de categorías
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
    allCategories: state.Category.allCategories,
    categoryAdminGet: state.Category.categoryAdminGet,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCategories: () => dispatch(getAllCategories()),
    getCateAdmin: (id) => dispatch(getCateAdmin(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesAdmin);
