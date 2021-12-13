import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainContainer } from "../reutilizables/MainContainer";
import { ButtonOne } from "../reutilizables/Button";
import { REACT_APP_API } from "../../store/consts/consts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MeLi from "./meli";
import { deleteOrder } from "../../store/actions/orders";
import { total } from "../utils";


export default function Paso2() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [datos, setDatos] = React.useState("");
  const order = JSON.parse(localStorage.getItem("order"));
  const orderid = localStorage.getItem("orderId");
  //const order = useSelector(state => state.Carrito.guestCart);
  //console.log(order)
  //const orderlines = orderline(order);

  let carromeli = [];
  let importe = 0

  const prepararMeli = (c) => {
  console.log("verificando");
  c.map((prodmeli) => {
      console.log("Producto", prodmeli.name, "Cantidad", prodmeli.quantity);
      if (!Number.isInteger(prodmeli.quantity)) {
        console.log("float");
        prodmeli.name = prodmeli.name + " " + prodmeli.quantity + " kilos";
        prodmeli.price = prodmeli.price * prodmeli.quantity
        prodmeli.quantity = 1;
      } 
      carromeli.push(prodmeli)
  });
    return carromeli;
  };

  useEffect( async () => {
    await prepararMeli(order);
    const objCheck = {
      id: orderid,
      carrito: carromeli, // preparando para MePa
    };

     axios
      .post(`${REACT_APP_API}mp/checkout`, objCheck)
      .then((data) => {
        setDatos(data.data);
        console.info("Contenido de data:", data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleBack = () => {
    dispatch(deleteOrder(orderid));
    console.log(orderid);
    navigate("/");
  };

  return (
    <MainContainer>
      <div>
        {!datos ? (
          <p>Aguarde un momento, Preparando MercadoPago...</p>
        ) : ( <>
          <MeLi productos={order} data={datos} />
          <div style={{textAlign: "right"}}>{ 
          order.forEach(element => {
            importe += element.price * element.quantity
          })}Importe: {importe.toFixed(2).replace(".",",") }</div>
                Al pagar, su pedido quedará completado
          </>
        )}
      </div>
      <ButtonOne onClick={handleBack}> Volver </ButtonOne>
    </MainContainer>
  );
}
