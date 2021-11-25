import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../components/searchBar';
import ProductGrid from '../../components/productGrid';
import {getAllProducts} from '../../store/actions/products';
import Cart from '../carrito';
import Paso1 from '../../components/checkout/paso1'
import Spinner from '../../components/spinner';

export default function Home(){

    const dispatch = useDispatch();
 
    useEffect(()=>{
        console.log('entrando al home')
        dispatch(getAllProducts())
    },[])

    const [loading] = useState(false);
    const productos = useSelector(state => state.Product.allProducts);
    const verCarro = useSelector(state => state.Carrito.guestCartProd)
    console.log(productos," - ", verCarro)

    return(
        <div className='container'>
        <SearchBar/>
        { productos.length ? <><ProductGrid loading={loading} items={productos}/>{ verCarro.length ? <><Cart /> <Paso1 /></> : ""}</> : <p><Spinner /> </p>}
        
        </div>
    )
}