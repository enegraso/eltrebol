import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../components/searchBar';
import ProductGrid from '../../components/productGrid';
import {getAllProducts} from '../../store/actions/products';
import Cart from '../carrito';

export default function Home(){

    const dispatch = useDispatch();

    useEffect(()=>{
        console.log('entrando al home')
        dispatch(getAllProducts())
    },[])

    const [loading] = useState(false);
    const productos = useSelector(state => state.Product.allProducts);
    console.log(productos)

    return(
        <div className='container'>
        <SearchBar/>
        { productos.length ? <ProductGrid loading={loading} items={productos}/> : <p>No se encontraron productos</p>}
        <Cart />
        </div>
    )
}