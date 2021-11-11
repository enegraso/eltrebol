import React, { useEffect } from "react";
import { useSelector} from "react-redux";

const OrderAdmin = () => {
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);

  if (!pedidoAdmin[0]) return <> Cargando... </>;

  return (
    <>
      {}
      <h2>Pedido { !pedidoAdmin[0].ordercart ? "Tomando pedido..." : pedidoAdmin[0].ordercart} </h2>
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
      <div>
        <h4>Items</h4>
      </div>
      <table border="1">
        <tr bgcolor="green">
          <td color="white">Cantidad</td>
          <td>Producto</td>
          <td>PU</td>
          <td>Importe</td>
          <td>Acción</td>
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
        {!pedidoAdmin[0].subtotal
          ? 0
          : "Importe: " + pedidoAdmin[0].subtotal}
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
        <button> Tomar </button>
        <button> Rechazar </button>
        <button> Volver </button>
      </div>
    </>
  );
};

export default OrderAdmin;
