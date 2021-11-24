import React, {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { MainContainer } from '../reutilizables/MainContainer';
import { Input } from '../reutilizables/Input';
import { Form } from '../reutilizables/Form';
import {ButtonOne} from '../reutilizables/Button';
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import { addOrder } from '../../store/actions/orders';
import { orderline, total } from '../utils';

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

export default function Paso1(){

    const dispatch = useDispatch();
    const orden = useSelector(state=>state.Carrito.guestCart);

    const {register, handleSubmit, errors} = useForm({
        mode: 'onBlur',
        resolver: yupResolver(schema)
    })

    const onSubmit = (data, e)=>{
        const guestOrder = orderline(orden);
        const precioTotal = total(guestOrder);
        console.log(guestOrder, precioTotal)

        dispatch(addOrder({
        client:data.client,
        address:data.address,
        cellphone:data.cellphone,
        subtotal:precioTotal,
        products:guestOrder,
        status:'pending',
        delivery:false,
        payd:false
        }))
        e.target.reset();
    }
//{...register('test', { required: true })}

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
                <ButtonOne type='submit'>Siguiente</ButtonOne>
            </Form>
        </MainContainer>
    )
}