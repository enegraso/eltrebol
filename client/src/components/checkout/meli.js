import { useEffect } from "react";
import s from "./meli.css";
import { total, orderline } from '../utils';

//Material UI-------------------------->

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//-------------------------------------->

const MeLi = ({ productos, data }) => {

  const orderlines = JSON.parse(localStorage.getItem("order"))

  useEffect(() => {
    const script = document.createElement("script"); //Crea un elemento html script

    const attr_data_preference = document.createAttribute("data-preference-id"); //Crea un nodo atribute
    attr_data_preference.value = data.id; //Le asigna como valor el id que devuelve MP

    //Agrega atributos al elemento script
    script.src =
      "https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js";
    script.setAttributeNode(attr_data_preference);

    console.log(data);

    //Agrega el script como nodo hijo del elemento form
    document.getElementById("form1").appendChild(script);
    /*     return () => {
      //Elimina el script como nodo hijo del elemento form
      document.getElementById("form1").removeChild(script);
    }; */
  }, [data]);

  return (
    <>
    <form id='form1'>
        <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell><h6>Producto</h6></TableCell>
              <TableCell align="right"><h6>Precio</h6></TableCell>
              <TableCell align="right"><h6>Cantidad</h6></TableCell>
              <TableCell align="right"><h6>Subtotal</h6></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((row) => (
              <TableRow
              key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                >
                <TableCell scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">${row.price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right"><b>${row.price * row.quantity}</b></TableCell>
              </TableRow>
            ))}
            <TableRow>
                <TableCell scope='row' span=''><h5><b>Total</b></h5></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align='right'><h5 style={{'color':'red'}}><b>${total(orderlines).toFixed(2).replace(".",",")}</b></h5></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      </form>
  </>
  );
};

export default MeLi;
