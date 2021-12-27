import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { orderSuccess } from "../../store/actions/carrito";
import "./meli.css";
import axios from "axios";
import { REACT_APP_SMSKEY } from "../../store/consts/consts"

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

const Success = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderid = localStorage.getItem("orderid");
  const pedido = JSON.parse(localStorage.getItem("order"));
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log("uso efecto");
    dispatch(orderSuccess());
    localStorage.removeItem("orderid");
    localStorage.removeItem("order");
    avisarxsms()
  }, [orderid]);

  let totalpedido = 0;

  const avisarxsms = async () => {
    const headers = {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: REACT_APP_SMSKEY, // Clave de el trebol Base64
    };

    const respu = await axios
      .post(
        "https://api.infobip.com/sms/1/text/single",
        {
          from: "EL TREBOL",
          to: ["542342568774"], /* Numero de julio */
          /* to: [542342513085],  Numero de federico */
          text:
            "Ha recibido un nuevo pedido, revise el siguiente link https://bit.ly/3p5w4Fx"
        },
        {
          headers: headers,
        }
      )
      .then((response) => {
        console.log("Mensaje enviado", response);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  };

  return (
    <>
      <Grid
        spacing={2}
        direction="column"
        alignItems="center"
        style={{ 
          marginTop: "100px"
        }}
      >
        <Grid item>
          <h3>Su pedido ha sido realizado exitosamente</h3>
        </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>
                   Producto
                  </TableCell>
                  <TableCell align="right">
                   Precio
                  </TableCell>
                  <TableCell align="right">
                   Cantidad
                  </TableCell>
                  <TableCell align="right">
                   Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pedido.map((row) => {
                  {
                    totalpedido += row.price * row.quantity;
                  }
                  return (
                    <>
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 1 },
                        }}
                      >
                        <TableCell scope="row">{row.name}</TableCell>
                        <TableCell align="right">$ {row.price}</TableCell>
                        <TableCell align="right">{row.quantity}</TableCell>
                        <TableCell align="right">
                          <b>$ {row.price * row.quantity}</b>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
                <TableRow>
                  <TableCell colspan={2} scope="row" span="">
                    <h5>
                      <b>Total</b>
                    </h5>
                  </TableCell>

                  <TableCell colspan={2} align="right">
                    <h5 style={{ color: "red" }}>
                      <b>$ {totalpedido.toFixed(2).replace(".", ",")}</b>
                    </h5>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item>
          <ButtonOne 
          style={{ width: "100px" }} 
          onClick={() => navigate("/")}
          color="warning"
          >
            inicio
          </ButtonOne>
        </Grid>
        <Grid item>
          <ButtonOne
            style={{ width: "100px" }}
            color="secondary"
            onClick={() => window.print()}
          >
            Imprimir
          </ButtonOne>
        </Grid>
        <Grid item>
          <div style={{ color: "grey" }}>
            Entrega:{" "}
            {pedido.delivery === true ? "Delivery" : "Retiro en sucursal"}
          </div>
          <div style={{ color: "grey" }}>
            Pagado:{" "}
            {pedido.payd === true
              ? "El pedido ha sido pagado"
              : "El pedido será abonado al recibirlo"}
          </div>
        </Grid>
      </Grid>
    </>
  );
};

export default Success;
