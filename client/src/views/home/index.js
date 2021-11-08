import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SearchBar from '../../components/searchBar';
import ProductGrid from '../../components/productGrid';
import {getProducts} from '../../store/actions/products';

export default function Home(){

    const [loading] = useState(false);
    const productos = useSelector(state => state.products);
    console.log(productos)

    return(
        <div className='container'>
        <SearchBar/>
        {/* { productos.length ? <ProductGrid loading={loading} items={productos}/> : <p>no products</p>} */}
        </div>
    )
}