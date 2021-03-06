import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from "react-router-dom";
import { prepOrder } from "../../store/actions/orders";
import swal from "sweetalert2";

const OrderAdminProcess = () => {
  const dispatch = useDispatch();
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);
  const configsAdmin = useSelector((state) => state.User.configsAdmin)
  const imageDelivery = "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638913622/motodelivery_r6mjqv.png"

  const handleClickPrep = async (e) => {
    e.preventDefault();
    const objStatus = {
      id: pedidoAdmin[0].id,
      status: "prepared",
    };

    await dispatch(prepOrder(objStatus));
    console.log(localStorage.getItem("orderPrepared"));
    if (localStorage.getItem("orderPrepared") === "true") {
      swal
        .fire({
          title: "Pedido en proceso de envio/Espera retiro",
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: `Aceptar`,
          icon: "success",
        })
        .then((respu) => {
          if (respu.isConfirmed) {
            window.open('https://api.whatsapp.com/send?phone=54'+ pedidoAdmin[0].cellphone +'&text='+configsAdmin.messagewaenvio)
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

  };

  if (!localStorage.getItem("userInfo"))
    return (
      <Link to="/loginadmin">
        <h5>Debe estar logueado</h5>
      </Link>
    );

  if (!pedidoAdmin[0]) return <> Cargando... </>;

  var today = new Date(pedidoAdmin[0].updatedAt);
  var d = today

  return (
    <>
      <div className="contenOrder">
        <div className="titleOrder">
          <h2>
            Pedido{" "}
            {!pedidoAdmin[0].id
              ? "Tomando pedido..."
              : pedidoAdmin[0].id }
            {" - Procesando"}
            <br /> Inicio proceso { d.toLocaleString() }
          </h2>
        </div>
        <div>
          {!pedidoAdmin[0].client
            ? "No hay pedido"
            : "Cliente: " + pedidoAdmin[0].client}
        </div>
        <div>
          {!pedidoAdmin[0].address
            ? "Sin direcci??n"
            : "Direcci??n: " + pedidoAdmin[0].address}
        </div>
        <div>
          {!pedidoAdmin[0].cellphone
            ? "Sin direcci??n"
            : "Direcci??n: " + pedidoAdmin[0].cellphone}
        </div>
        <table border="1">
          <tr>
            <td className="titleLines" width="15%">Cantidad</td>
            <td className="titleLines" width="50%">Producto</td>
            <td className="titleLines" width="15%">PU</td>
            <td className="titleLines" width="20%">Importe</td>
          </tr>
          {pedidoAdmin[0].orderlines.map((line) => {
            return (
              <tr bgcolor="lightgreen" key={line.id}>
                <td>
                {!Number.isInteger(line.quantity)
                      ? line.quantity.toFixed(3).replace(".", ",")
                      : line.quantity} {/* - {!line.product ? "envio" : line.product.units} */}{" "}
                </td>
                <td className="orderLineProduct">
                  <img className="imageProduct" src={!line.product ? imageDelivery : line.product.image} />
                  {!line.product ? "Envio a domicilio" : line.product.name}
                </td>
                <td>{Number(!line.product ? line.price : line.product.price).toFixed(2).replace(".",",")}</td>
                <td>{Number(line.subtotal).toFixed(2).replace(".",",")}</td>
              </tr>
            );
          })}
        </table>
        <div className="importePedido">
          {!pedidoAdmin[0].subtotal
            ? 0 : "Importe AR$: " + (pedidoAdmin[0].subtotal).toFixed(2).replace(".",",") }
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
          <button className="btn btn-primary" onClick={handleClickPrep}>
            { pedidoAdmin[0].delivery === true ? "Procesado - Enviar" : "Procesado - Avisar" }
          </button>
          <button className="btn btn-secondary" onClick={() => window.print() }>
              {" "}
              Imprimir{" "}
            </button>
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

export default OrderAdminProcess;
