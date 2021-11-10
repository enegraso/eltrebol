import React from 'react';
import ProductCard from '../productCard';
import Spinner from '../spinner';

export default function ProductGrid({items, loading}){
    
     return (
    loading ? (<Spinner/>)
    : <section class='container'>
        <div className="row justify-content-center row-cols-md-4 row-cols-sm-1">
        {items.map(e =>(
            (<ProductCard 
                id={e.id} 
                name={e.name}
                img={e.image}
                price={e.price}
                exist={e.exist}
                oferta={e.isOffert}
                />)
        ))}
        </div>
    </section>
     )
}
