import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from "react-router-dom";

const OrderAdmin = () => {
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);

  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

    const handleClick =() => {
      window.print()
    }

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
            <td className="titleLines" width="15%">
              Cantidad
            </td>
            <td className="titleLines" width="55%">
              Producto
            </td>
            <td className="titleLines" width="15%">
              PU
            </td>
            <td className="titleLines" width="25%">
              Importe
            </td>
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
        <div>
          {!pedidoAdmin[0].subtotal ? 0 : "Importe AR$: " + Number(pedidoAdmin[0].subtotal).toFixed(2)}
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
          <button className="btn btn-primary" onClick={handleClick}> Preparar </button>
          <button className="btn btn-secondary"> Rechazar </button>
          <button
            className="btn btn-link"
            onClick={() => {
              window.history.go(-1);
            }}
          >
            {" "}
            Volver{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderAdmin;
