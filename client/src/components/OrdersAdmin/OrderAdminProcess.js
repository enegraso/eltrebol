import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from 'react-router-dom'

const OrderAdminProcess = () => {
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);

  if (!localStorage.getItem("userInfo")) return <Link to='/loginadmin'><h5>Debe estar logueado</h5></Link>
  
  if (!pedidoAdmin[0]) return <> Cargando... </>;

  return (
    <>
      <div className="contenOrder">
        <div className="titleOrder">
        <h2>
          Pedido{" "}
          {!pedidoAdmin[0].ordercart
            ? "Tomando pedido..."
            : pedidoAdmin[0].ordercart}{" "}
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
        <table border="1">
          <tr>
            <td className="titleLines">Cantidad</td>
            <td className="titleLines">Producto</td>
            <td className="titleLines">PU</td>
            <td className="titleLines">Importe</td>
            <td className="titleLines">Acción</td>
          </tr>
          {pedidoAdmin[0].orderlines.map((line) => {
            return (
              <tr bgcolor="lightgreen" key={line.id}>
                <td>{line.quantity}</td>
                <td>{line.product.name}</td>
                <td>{line.product.price}</td>
                <td>{line.subtotal}</td>
                <td>
                  <button> MODIFICAR </button>
                </td>
              </tr>
            );
          })}
        </table>
        <div>
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
          <button> Enviar </button>
          <button> Volver </button>
        </div>
      </div>
    </>
  );
};

export default OrderAdminProcess;
