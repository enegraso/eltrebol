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
        .required('Ingrese su nombre por favor'),
    address: yup
        .string()
        .required('Ingrese su direccion de envio'),
    cellphone: yup
        .string()
        .required('No debe faltar su numero de contacto')
        .min(10, 'Minimo de 10 digitos')
        .max(10, 'Maximo de 10 digitos')
})

export default function Paso1() {

    const navigate = useNavigate()

    const dispatch = useDispatch();
    const orden = useSelector(state => state.Carrito.guestCart);
    const config = useSelector(state => state.User.configsAdmin);

    const { register, handleSubmit, formState:{ errors } } = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })


    const [delivery, setDelivery] = useState( 'delivery');
    const [pago, setPago] = useState('meLi')

    const handleDelivery = (event) => {
      setDelivery(event.target.value);

    };

    const handlePago = (event) =>{
        setPago(event.target.value)
    }
    
    const onSubmit = async (data, e) => {

        const guestOrder = orderline(orden);
        const precioTotal = total(guestOrder);
        console.log(guestOrder, precioTotal)
        let conEnvio = {}
        if (delivery === 'delivery')
        {
            conEnvio =  [...guestOrder, {
            id: -1,
            name: "Envio a domicilio",
            price: config.deliveryprice,
            quantity: 1 
            }] 
        } 

        console.log("Objeto enviado",conEnvio)
        await dispatch(addOrder({
            'client': data.client,
            'address': data.address,
            'cellphone': data.cellphone,
            'subtotal': delivery === 'delivery' ? precioTotal + config.deliveryprice : precioTotal,
            'products': delivery === 'delivery' ? conEnvio : guestOrder,
            'status': 'waiting',
            'delivery': delivery === 'delivery' ? true : false,
            'payd': false
        }))

        if (localStorage.getItem('orderId') > 0) {
            let orderId = localStorage.getItem('orderId')
            dispatch(getOrderGuest(orderId))

            localStorage.setItem("order", JSON.stringify(delivery === 'delivery' ? conEnvio :  guestOrder /* guestOrder */));
            console.log("ORDEN enviada:",localStorage.getItem("order"))

            if (pago === 'meLi'){ 

                navigate('/paso2')
            }
            else{
            
            navigate('/checkout')
            
        }
     } 
    }

    return (
        <MainContainer>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <h6 style={{'textDecoration':'underline'}}>Ingrese sus datos de compra</h6>
                <Input
                    {...register('client', { required: true })}
                    name='client'
                    type='text'
                    placeholder='Nombre'
                    label='Nombre'
                    required
                />
                <p style={{'color':'red'}}><em>{errors.client?.message}</em></p>
                <Input
                    {...register('cellphone', { required: true })}
                    name='cellphone'
                    type='text'
                    placeholder='Escribilo sin 0 y sin 15'
                    label='Tu numero de celular'
                    required
                />
                <p style={{'color':'red'}}><em>{errors.cellphone?.message}</em></p>
                <Input
                    {...register('address', { required: true })}
                    name='address'
                    type='text'
                    placeholder='Domicilio'
                    label='Domicilio de entrega'
                    required
                />
                <p style={{'color':'red'}}><em>{errors.address?.message}</em></p>
                <FormControl component="fieldset" style={{'marginTop':'10px'}}>
                   <h6 style={{'textDecoration':'underline'}}>Elija su forma de envio</h6>
                    <RadioGroup
                        aria-label="delivery"
                        name="delivery"
                        value= {delivery}
                        onChange={handleDelivery}
                    >
                        <FormControlLabel value='local' control={<Radio size='small' color='success'/>} label="Retire de nuestro Local" />
                        <FormControlLabel value='delivery' control={<Radio size='small' color='success'/>} label="Envio a domicilio (delivery)" />
                    </RadioGroup>
                </FormControl >

                <FormControl component="fieldset" style={{'marginTop':'10px'}}>
                    <h6 style={{'textDecoration':'underline'}}>Elija su forma de pago</h6>
                    <RadioGroup
                        aria-label="pago"
                        name="pago"
                        value={pago}
                        onChange={handlePago}
                    >
                        <FormControlLabel value="efectivo" control={<Radio size='small' color='success'/>} label="Pago en efectivo" />
                        <FormControlLabel value="meLi" control={<Radio size='small' color='success'/>} label="Pago con Mercado Pago" />
                    </RadioGroup>
                </FormControl>

                  <ButtonOne /* type='submit' */>Siguiente</ButtonOne>
            </Form>
        </MainContainer>
        
    )
}


