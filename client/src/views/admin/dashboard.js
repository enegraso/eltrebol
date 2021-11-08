import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/users";
import { Link } from "react-router-dom";
import styles from "./dashboard.css";
import { BiLogOut } from "react-icons/bi";
import OrdersAdmin from "../../components/OrdersAdmin/OrdersAdmin";

const Dashboard = (props) => {
  return (
    <>
      <h4>
        Hola {props.userDetail.name}{" "}
        <button onClick={() => props.logOut(props.userDetail.id)}>
          <BiLogOut />
        </button>
      </h4>
      <div className={styles.menuitems}>
        <Link to="/admin/products">Productos</Link>
        <Link to="/admin/categories">Categorías</Link>
        <Link to="/admin/user">User</Link>
      </div>
      <h5>Pedidos pendientes</h5>
      <OrdersAdmin status="pending" />
      <h5>Pedidos enviados</h5>
      <OrdersAdmin status="delivered" />
      <h5>Pedidos terminados</h5>
      <OrdersAdmin status="done" />
    </>
  );
};

function mapStateToProps(state) {
  return {
    userDetail: state.userDetail,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: (iduser) => dispatch(logOut(iduser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
