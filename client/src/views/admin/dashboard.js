import React, { useEffect } from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actions/users";
import { Link } from "react-router-dom";
import "./dashboard.css";
import { BiLogOut } from "react-icons/bi";
import OrdersAdmin from "../../components/OrdersAdmin/OrdersAdmin";
import swal from 'sweetalert2'
import OneSignal from 'react-onesignal'

const Dashboard = (props) => {

  const Notificar = () => {
    OneSignal.sendTag('tech','tag').then(() =>{
      console.log('Notificar')
    }) 
  }

  useEffect(() => {
    if (localStorage.getItem("allowLogin") == "si") {
      OneSignal.init({ appId: "c1b1c16f-ff99-42ef-94b5-5eb43a2c3c4f" })
      Notificar()
    }
  })

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
            <BiLogOut style={ {border: "2px dash forestgreen", width: "32px", height: "32px"}}/>
          </button>
        </h4>
        <div className="menuitems">
          <Link to="/admin/categories">Categorías</Link>
          <Link to="/admin/products">Productos</Link>
          <Link to="/admin/user">User</Link>
          <Link to="/admin/configs">Configs</Link>
        </div>
        <div className="contentOrders">
          <div className="boxOrder" style={ {"border": "1px solid forestgreen"}}>
            <div className="boxTitleOrder"><h5>Pedidos pendientes</h5></div>
            <OrdersAdmin status="pending" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid green"}}>
          <div className="boxTitleOrder"><h5>Pedidos en proceso</h5></div>
            <OrdersAdmin status="preparing" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid blue"}}>
          <div className="boxTitleOrder"><h5>Pedidos armados</h5></div>
            <OrdersAdmin status="prepared" />
          </div>
          <div className="boxOrder" style={ {"border": "1px solid greenyellow"}}>
          <div className="boxTitleOrder"><h5>Pedidos entregados</h5></div>
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
    configsAdmin: state.User.configsAdmin
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logOut: (iduser) => dispatch(logOut(iduser)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
