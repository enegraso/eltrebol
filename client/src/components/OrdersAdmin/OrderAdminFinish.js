import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from 'react-router-dom'
import { prepOrder } from "../../store/actions/orders";
import swal from 'sweetalert2'


const OrderAdminFinish
 = () => {
  const dispatch = useDispatch()
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);

  const handleClick = (e) => {
    e.preventDefault()
    const objStatus = {
      id: pedidoAdmin[0].id,
      status: "done"
    }
    dispatch(prepOrder(objStatus))
    console.log(localStorage.getItem("orderPrepared"));
    if (localStorage.getItem("orderPrepared") === "true") {
      swal
        .fire({
          title: "El pedido se ha completado",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Aceptar`,
          icon: "success",
        })
        .then((respu) => {
          if (respu.isConfirmed) {
            window.open('https://api.whatsapp.com/send?phone=54'+ pedidoAdmin[0].cellphone +'&text=Pedido completado')
            window.history.go(-1);
          }
        });
    } else {
      swal.fire({
        title: localStorage.getItem("orderPrepared"),
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: `Aceptar`,
        icon: "error",
        // denyButtonText: `Cancelar`,
      });
    }
  }

  if (!localStorage.getItem("userInfo")) return <Link to='/loginadmin'><h5>Debe estar logueado</h5></Link>
  
  if (!pedidoAdmin[0]) return <> Cargando... </>;

  return (
    <>
      <div className="contenOrder">
        <div className="titleOrder">
        <h2>
          Pedido{" "}
          {!pedidoAdmin[0].id
            ? "Tomando pedido..."
            : pedidoAdmin[0].id}{" - Entregado"}
        </h2>
        </div>
        <div>
          {!pedidoAdmin[0].client
            ? "No hay pedido"
            : "Cliente: " + pedidoAdmin[0].client}
        </div>
        <div>
          {!pedidoAdmin[0].address
            ? "Sin dirección"
            : "Dirección: " + pedidoAdmin[0].address}
        </div>
        <div>
          {!pedidoAdmin[0].cellphone
            ? "Sin dirección"
            : "Dirección: " + pedidoAdmin[0].cellphone}
        </div>
        <table border="1" width="84vw">
          <tr>
            <td className="titleLines">Cantidad</td>
            <td className="titleLines">Producto</td>
            <td className="titleLines">PU</td>
            <td className="titleLines">Importe</td>
          </tr>
          {pedidoAdmin[0].orderlines.map((line) => {
            return (
              <tr bgcolor="lightgreen" key={line.id}>
                <td>
                  {line.quantity} - {line.product.units}{" "}
                </td>
                <td className="orderLineProduct">
                  <img className="imageProduct" src={line.product.image} />
                  {line.product.name}
                </td>
                <td>{Number(line.product.price).toFixed(2)}</td>
                <td>{Number(line.subtotal).toFixed(2)}</td>
              </tr>
            );
          })}
        </table>
        <div className="importePedido">
          {!pedidoAdmin[0].subtotal ? 0 : "Importe: " + pedidoAdmin[0].subtotal}
        </div>
        <div>
          {pedidoAdmin[0].delivery === true
            ? "Enviar a domicilio"
            : "Retira en comercio"}
        </div>
        <div>
          {pedidoAdmin[0].payd === true
            ? "Pedido pagado"
            : "Paga al recibir pedido"}
        </div>{" "}
        <div>
          <button className="btn btn-primary"  onClick={handleClick}> Pedido completado </button>
          <button className="btn btn-primary" onClick={() => window.print() }>
              {" "}
              Imprimir{" "}
            </button>
          <button className="btn btn-link" onClick={ () => { window.history.go(-1); }}> Volver </button>
        </div>
      </div>
    </>
  );
};

export default OrderAdminFinish;
