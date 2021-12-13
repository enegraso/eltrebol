import React, {forwardRef} from 'react';
import TextField from '@mui/material/TextField';

export const Input = forwardRef((props, ref)=>{
    return <TextField variant='filled' margin='dense' size='small' inputRef={ref} fullWidth {...props}/>
})