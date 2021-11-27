import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from "react-router-dom";
import { prepOrder } from "../../store/actions/orders";
import swal from "sweetalert2";

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);
  const configsAdmin = useSelector((state) => state.User.configsAdmin)


  if (!localStorage.getItem("userInfo"))
    return (
      <>
        <Link to="/loginadmin">
          <h5>Debe estar logueado</h5>
        </Link>
      </>
    );

  const handleClick = async (e) => {
    e.preventDefault();
    /* window.print(); */
    const objStatus = {
      id: pedidoAdmin[0].id,
      status: "preparing",
    };
    await dispatch(prepOrder(objStatus));
    window.history.go(-1);
  };

  const handleClickRej = (e) => {
    e.preventDefault();
    swal
      .fire({
        title: "Realmente desea rechazar/anular pedido?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: `Sí`,
        icon: "question",
        // denyButtonText: `Cancelar`,
      })
      .then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const objStatus = {
            id: pedidoAdmin[0].id,
            status: "rejected",
          };
          dispatch(prepOrder(objStatus));
          if (localStorage.getItem("orderPrepared") === "true") {
            swal
              .fire({
                title: "El pedido ha sido rechazado",
                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: `Aceptar`,
                icon: "success",
              })
              .then((respu) => {
                if (respu.isConfirmed) {
                  window.open('https://api.whatsapp.com/send?phone=54'+ pedidoAdmin[0].cellphone +'&text='+configsAdmin.messagewareject)
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
      });
  };

  if (!pedidoAdmin[0]) return <> Cargando... </>;

  return (
    <>
      <div className="contenOrder">
        <div className="titleOrder">
          <h2>
            Pedido{" "}
            {!pedidoAdmin[0].id
              ? "Tomando pedido..."
              : pedidoAdmin[0].id }
            {" - "}
            {pedidoAdmin[0].status === "pending" ? "Pendiente" : "Completado"}
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
          {!pedidoAdmin[0].subtotal
            ? 0
            : "Importe AR$: " + Number(pedidoAdmin[0].subtotal).toFixed(2)}
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
          {pedidoAdmin[0].status === "pending" ? (
            <button className="btn btn-primary" onClick={handleClick}>
              {" "}
              Preparar{" "}
            </button>
          ) : (
            ""
          )}
              <button className="btn btn-primary" onClick={() => window.print() }>
              {" "}
              Imprimir{" "}
            </button>
          {pedidoAdmin[0].status === "pending" ? (
            <button className="btn btn-secondary" onClick={handleClickRej}>
              {" "}
              Rechazar{" "}
            </button>
          ) : (
            ""
          )}
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
