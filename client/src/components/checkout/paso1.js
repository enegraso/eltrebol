import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { MainContainer } from '../reutilizables/MainContainer';
import { Input } from '../reutilizables/Input';
import { Form } from '../reutilizables/Form';
import { ButtonOne } from '../reutilizables/Button';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../../store/actions/orders';
import { orderline, total } from '../utils';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {getOrderGuest} from '../../store/actions/orders'
import { useNavigate } from 'react-router-dom';

//get from localStorage

const schema = yup.object().shape({
    client: yup
        .string()
        .required('Ingrese su Nombre por favor'),
    address: yup
        .string()
        .required('Ingrese su direccion de envio'),
    cellphone: yup
        .string()
        .required('No debe faltar su numero de contacto')
})

export default function Paso1() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const orden = useSelector(state => state.Carrito.guestCart);

    const { register, handleSubmit, errors } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const [value, setValue] = React.useState(true);
    const [pago, setPago] = React.useState('meLi')

    const handleChange = (event) => {
      setValue(event.target.value);
    };

    const handlePago = (event) =>{
        setPago(event.target.value)
    }
    
    console.log(pago)
    
    const onSubmit = async (data, e) => {
        const guestOrder = orderline(orden);
        const precioTotal = total(guestOrder);
        console.log(guestOrder, precioTotal)

        await dispatch(addOrder({
            'client': data.client,
            'address': data.address,
            'cellphone': data.cellphone,
            'subtotal': precioTotal,
            'products': guestOrder,
            'status': 'pending',
            'delivery': false,
            'payd': false
        }))

        if (localStorage.getItem('orderId') > 0) {
            let orderId = localStorage.getItem('orderId')
            dispatch(getOrderGuest(orderId))
            e.target.reset();

            localStorage.setItem("order", JSON.stringify(guestOrder));
            console.log("ORDEN:",localStorage.getItem("order"))
            
            // gracias a useNavigate puedo avanzar al próximo paso
            // aquí debería ir un if mercadopago ? que valla a paso2
            navigate('/paso2')
            // else: que vaya a un componente que muestre el pedido listo
     } 


    }

    return (
        <MainContainer>
            <h1>Datos de Compra</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    {...register('client', { required: true })}
                    name='client'
                    type='text'
                    placeholder='Nombre'
                    label='Nombre'
                    required
                /*    error = {!!errors.client}
                   helperText={errors?.client?.message} */
                />
                <Input
                    {...register('cellphone', { required: true })}
                    name='cellphone'
                    type='text'
                    placeholder='Numero de Contacto'
                    label='Numero de Contacto'
                    required
                /*     error = {!!errors.cellphone}
                    helperText={errors?.cellphone?.message} */
                />
                <Input
                    {...register('address', { required: true })}
                    name='address'
                    type='text'
                    placeholder='Domicilio'
                    label='Domicilio de entrega'
                    required
                /*     error = {!!errors.address}
                    helperText={errors?.address?.message} */
                />
                <FormControl component="fieldset">
                    <FormLabel component="legend">Elija su forma de envio</FormLabel>
                    <RadioGroup
                        aria-label="delivery"
                        name="delivery"
                        value= {value}
                        onChange={handleChange}
                    >
                        <FormControlLabel value={false} control={<Radio />} label="Retire de nuestro Local" />
                        <FormControlLabel value={true} control={<Radio />} label="Envio a domicilio (delivery)" />
                    </RadioGroup>
                </FormControl>

                <FormControl component="fieldset">
                    <FormLabel component="legend">Elija su forma de pago</FormLabel>
                    <RadioGroup
                        aria-label="pago"
                        name="pago"
                        value={pago}
                        onChange={handlePago}
                    >
                        <FormControlLabel value="efectivo" control={<Radio />} label="Pago en efectivo" />
                        <FormControlLabel value="meLi" control={<Radio />} label="Pago con Mercado Pago" />
                    </RadioGroup>
                </FormControl>
                {/* <Link to='/paso2'> */}
                  <ButtonOne /* type='submit' */>Siguiente</ButtonOne>
                 {/* </Link> */}
            </Form>
        </MainContainer>
        
    )
}


