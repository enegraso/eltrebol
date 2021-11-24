/*
import React from "react";
import { useForm } from "react-hook-form";
import { MainContainer } from "../reutilizables/MainContainer";
import { Form } from "../reutilizables/Form";
import { Input } from "../reutilizables/Input";
import { ButtonOne } from "../reutilizables/Button";
import { Checkbox, FormControlLabel } from "@mui/material";

//forma de pago.

export default function Paso2() {
  //userData. setUserData
  //pagoEfectivo true.

  //const history = useHistory(); 
const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: {
      pagoEfectivo: data.pagoEfectivo,
      pagoTarjeta: data.pagoTarjeta,
    },
    mode: "onBlur",
  });

  const onSubmit =(data)=>{
    
    console.log(data)}

  const pagoTarjeta = watch("pagoTarjeta");

  return (
    <MainContainer>
      <h1>Elija su forma de pago</h1>
      <Form>
        <FormControlLabel
          control={
            <Checkbox checked={data.pagoEfectivo} 
              onChange={handleChange}
              name="pagoEfectivo" 
            />
          }
          label="Pago en Efectivo"
        />
        <FormControlLabel
          control={
            <Checkbox
              defaultValue={data.pagoTarjeta}
              defaultChecked={data.pagoTarjeta}
              color="success"
              inputRef={register}
              name="pagoTarjeta"
            />
          }
          label="Pago con Tarjeta: Mercado Pago"
        />
      </Form>
    </MainContainer>
  );
}
*/