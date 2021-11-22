import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/users";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { BiLogOut } from "react-icons/bi";
import OrdersAdmin from "../../components/OrdersAdmin/OrdersAdmin";

const Dashboard = (props) => {
  return (
    <>
      <div className="boxdash">
        <h4>
          Hola {props.userDetail.name}{" "}
          <button
            className="btn btn-light"
            onClick={() =>
              props.logOut(
                localStorage.getItem("userInfo", JSON.stringify("id"))
              )
            }
          >
            <BiLogOut />
          </button>
        </h4>
        <div className="menuitems">
          <Link to="/admin/categories">Categorías</Link>
          <Link to="/admin/products">Productos</Link>
          <Link to="/admin/user">User</Link>
        </div>
        <div className="contentOrders">
          <div className="boxOrder" style={ {"border": "1px solid forestgreen"}}>
            <h5>Pedidos pendientes</h5>
            <OrdersAdmin status="pending" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid green"}}>
            <h5>Pedidos en proceso/armando</h5>
            <OrdersAdmin status="processing" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid blue"}}>
            <h5>Pedidos enviados/en espera</h5>
            <OrdersAdmin status="delivery" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid greenyellow"}}>
            <h5>Pedidos terminados y entregados</h5>
            <OrdersAdmin status="done" />
          </div>
        </div>
      </div>
    </>
  );
};

function mapStateToProps(state) {
  return {
    userDetail: state.User.userDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: (iduser) => dispatch(logOut(iduser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
