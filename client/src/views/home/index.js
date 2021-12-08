import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../components/searchBar';
import ProductGrid from '../../components/productGrid';
import {getAllProductsCat} from '../../store/actions/products';
import Cart from '../carrito';
import Paso1 from '../../components/checkout/paso1'
import Spinner from '../../components/spinner';
import {getConfig} from '../../store/actions/users'

export default function Home(){

    const dispatch = useDispatch();
 
    useEffect(() => {
        console.log('entrando al home')
        dispatch(getAllProductsCat()) // Pido todos los productos
        dispatch(getConfig(1)) // Pido los datos de configuración
    },[])

    const [loading] = useState(false);
    const productos = useSelector(state => state.Product.allProducts);
    const verCarro = useSelector(state => state.Carrito.guestCartProd)
    console.log(productos," - ", verCarro)

    const exist = productos.filter(function(productos){
        return productos.exist === true
    })

    return(
        <div className='container'>
        <SearchBar/>
        { exist.length ? <><ProductGrid loading={loading} items={exist}/>{ verCarro.length ? <><Cart /> <Paso1 /></> : ""}</> : <p><Spinner /> </p>}
        
        </div>
    )
}