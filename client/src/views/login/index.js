import React from 'react';
import {Formik, Form} from 'formik'

const LogIn=()=>{


    return (
        <div className='container sm'>
        <Formik
        initialValues={{username:"", password:""}}
        onSubmit = {(values, {setSubmitting}) =>{
            setTimeout(()=>{
                console.log('Logging in', values);
                setSubmitting(false);
            }, 500);
        }}
        >
            {
                props =>{
                    const{
                        values,
                        touched,
                        errors,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit
                    } = props;
                    return (
                        <Form onSubmit={handleSubmit}>
                            <label className='form-label' htmlFor='Usuario'>Usuario</label>
                            <input
                              className='form-control'
                              id='username'
                              name='username'
                              type='text'
                              placeholder='Nombre de Usuario'
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <label className='form-label' htmlFor='password'>Password</label>
                            <input
                              className='form-control'
                              id='password'
                              name='password'
                              type='password'
                              placeholder='Ingresa tu contraseña'
                              value={values.password}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <button type='sumit' disabled={isSubmitting}>LogIn</button>
                        </Form>
                    );
                }
            }
        </Formik>
        </div>
    )
}

export default LogIn;