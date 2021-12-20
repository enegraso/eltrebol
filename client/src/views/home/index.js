import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ProductGrid from '../../components/productGrid';
import {getAllProductsCat} from '../../store/actions/products';
import GridCart from '../carrito/gridCart';
// import Paso1 from '../../components/checkout/paso1'
import Spinner from '../../components/spinner';
import {getConfig} from '../../store/actions/users'
import AbouUs from '../../components/AboutUs';
import NavBar from '../../components/navBar';
import Alert  from "@mui/material/Alert";
import AlertTitle  from "@mui/material/AlertTitle";

export default function Home(){

    const dispatch = useDispatch();
    const productos = useSelector(state => state.Product.allProducts);
    const mensajeno = useSelector(state => state.Product.alertprod);
    

    useEffect(async () => {
        // console.log('entrando al home')
        await dispatch(getAllProductsCat()) // Pido todos los productos
        await dispatch(getConfig(1)) // Pido los datos de configuración
        // sortCategories(productos)
     },[])

    const [loading] = useState(false);
 /*    const productos = useSelector(state => state.Product.allProducts); */
    const verCarro = useSelector(state => state.Carrito.guestCartProd)
//     console.log(productos," - ", verCarro)
   
    const exist = productos.filter(function(productos){
        return productos.exist === true
    }) 

    return(
        <>
        <div className='container' style={{'marginTop':'5em'}}>
      { exist.length ? <><ProductGrid loading={loading} items={exist}/></> : <div>{ 
      /* productos.length &&  */mensajeno.length ? <Alert severity="warning"><AlertTitle>No se encontró el producto</AlertTitle>Intente escribirlo de otra forma</Alert> : <Spinner />
      } </div>}  { verCarro.length ? <GridCart /> : ""}    
        </div>
        <AbouUs />
        </>
    )
}