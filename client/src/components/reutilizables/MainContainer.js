import React from 'react';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root:{
        marginTop:'1em',
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    }
})

export const MainContainer = ({children, ...props})=>{
    
    const styles=useStyles();
    
    return(
        <Container className={styles.root} component='main' maxWidth='xs' {...props}>
        {
            children
        }
        </Container>
    )
}