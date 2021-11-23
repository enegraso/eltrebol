import React from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/users";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { BiLogOut } from "react-icons/bi";
import OrdersAdmin from "../../components/OrdersAdmin/OrdersAdmin";
import swal from 'sweetalert2'

const Dashboard = (props) => {

  const handleClick = (e) => {
      swal
        .fire({
          title: "Realmente desea salir?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: `Sí`,
          icon: "question",
          // denyButtonText: `Cancelar`,
        })
        .then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            props.logOut(localStorage.getItem("userInfo", JSON.stringify("id")))
          } 
        });
  }

  return (
    <>
      <div className="boxdash">
        <h4>
          Hola {props.userDetail.name}{" "}
          <button
            className="btn btn-light"
            onClick={handleClick}
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
            <div className="boxTitleOrder"><h5>Pedidos pendientes</h5></div>
            <OrdersAdmin status="pending" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid green"}}>
          <div className="boxTitleOrder"><h5>Pedidos en proceso/armando</h5></div>
            <OrdersAdmin status="preparing" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid blue"}}>
          <div className="boxTitleOrder"><h5>Pedidos enviados/en espera</h5></div>
            <OrdersAdmin status="prepared" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid greenyellow"}}>
          <div className="boxTitleOrder"><h5>Pedidos terminados y entregados</h5></div>
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
