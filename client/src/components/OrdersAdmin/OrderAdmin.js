import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./orderAdmin.css";
import { Link } from "react-router-dom";
import { prepOrder } from "../../store/actions/orders";
import swal from "sweetalert2";

//Material UI-------------------------->

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { ButtonOne } from "../reutilizables/Button";

//-------------------------------------->

const OrderAdmin = () => {
  const dispatch = useDispatch();
  const pedidoAdmin = useSelector((state) => state.Order.orderAdmin);
  const configsAdmin = useSelector((state) => state.User.configsAdmin);
  const imageDelivery =
    "https://res.cloudinary.com/dyejl1qrj/image/upload/v1638913622/motodelivery_r6mjqv.png";

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
                  window.open(
                    "https://api.whatsapp.com/send?phone=54" +
                      pedidoAdmin[0].cellphone +
                      "&text=" +
                      configsAdmin.messagewareject
                  );
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

  if (pedidoAdmin[0].status === "pending")
    var today = new Date(pedidoAdmin[0].createdAt);
  else var today = new Date(pedidoAdmin[0].updatedAt);

  var d = today;

  return (
    <Grid
      spacing={2}
      direction="column"
      alignItems="center"
      /*     style={{
      'marginTop':'100px',
      'marginBottom':'100px'
    }} */
    >
      <Grid item bgcolor="lightgreen">
        <h5>
          Pedido {!pedidoAdmin[0].id ? "Tomando pedido..." : pedidoAdmin[0].id}
          {" - "}
          {pedidoAdmin[0].status === "pending"
            ? "Pendiente"
            : "Completo y entregado"}
          <br />
          {pedidoAdmin[0].status === "pending"
            ? "Ingreso " + d.toLocaleString()
            : "Entregado " + d.toLocaleString()}
        </h5>
      </Grid>
      <Grid item>
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
            ? "Sin teléfono"
            : "Teléfono: " + pedidoAdmin[0].cellphone}
        </div>
      </Grid>
      <Grid item>
        <TableContainer
          component={Paper}
          style={{
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Table size="small" aria-label="a dense table">
            <TableHead bgcolor="lightgreen">
              <TableRow>
                <TableCell padding="none" align="center" width={1}>
                  Cantidad
                </TableCell>
                {/* <div className="imageProduct"> */}
                  <TableCell padding="none" align="center" width={1}></TableCell>
                {/* </div> */}
                <TableCell padding="checkbox" align="center" width={3}>
                  Producto
                </TableCell>
                <TableCell padding="checkbox" align="center" width={1}>
                  PU
                </TableCell>
                <TableCell padding="checkbox" align="center" width={1}>
                  Importe
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedidoAdmin[0].orderlines.map((line) => {
                return (
                  <TableRow key={line.id}>
                    <TableCell
                      scope="row"
                      padding="none"
                      align="center"
                      width={1}
                    >
                      {!Number.isInteger(line.quantity)
                        ? line.quantity.toFixed(3).replace(".", ",")
                        : line.quantity}{" "}
                      {/* - {!line.product ? "envio" : line.product.units}{" "} */}
                    </TableCell>
                    {/* <div className="imageProduct"> */}
                      <TableCell padding="none" /* align="right" */  width={1}>
                         <img
                          className="imageProduct"
                          src={
                            !line.product ? imageDelivery : line.product.image
                          }
                        /> 
                      </TableCell>
                    {/* </div> */}
                    <TableCell padding="none" /* align="right" */ width={5}>
                      {!line.product ? "Envio a domicilio" : line.product.name}
                    </TableCell>
                    <TableCell padding="none" align="right" width={1}>
                      {Number(!line.product ? line.price : line.product.price)
                        .toFixed(2)
                        .replace(".", ",")}
                    </TableCell>
                    <TableCell padding="none" align="right" width={1}>
                      <b>
                        {Number(line.subtotal).toFixed(2).replace(".", ",")}
                      </b>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item>
        <div className="importePedido">
          {!pedidoAdmin[0].subtotal
            ? 0
            : "Importe AR$: " +
              pedidoAdmin[0].subtotal.toFixed(2).replace(".", ",")}
        </div>
        {pedidoAdmin[0].status === "pending" ? (
          <>
            <div>
              {pedidoAdmin[0].delivery === true
                ? "Enviar a domicilio"
                : "Retira en comercio"}
            </div>
            <div>
              {pedidoAdmin[0].payd === true
                ? "Pedido pagado" + pedidoAdmin[0].payd_idml
                : "Paga al recibir pedido"}
            </div>
          </>
        ) : (
          <> </>
        )}
      </Grid>
      <Grid item>
        {pedidoAdmin[0].status === "pending" ? (
          <button className="btn btn-primary" onClick={handleClick}>
            {" "}
            Preparar{" "}
          </button>
        ) : (
          ""
        )}
        <button className="btn btn-secondary" onClick={() => window.print()}>
          {" "}
          Imprimir{" "}
        </button>
        {pedidoAdmin[0].status === "pending" ? (
          <button className="btn btn-info" onClick={handleClickRej}>
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
      </Grid>
    </Grid>
  );
};

export default OrderAdmin;
