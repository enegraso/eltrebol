import React from 'react';

export default function ProductCard({name, img, price, exists, id, oferta}){
    return(
        <div className='col'>
        <div className="card text-center" style={{width: '18rem'}}>
            <img src={img} className="card-img-top" alt="product"/>
            <div className="card-body">
                <p className="card-title"><strong>{title}</strong></p>
                <p className="card-text">
                    Price: $ {price}
                    <br/>
                    Existe: {exists}
                    <br/>
                    Oferta: {oferta}
                </p>
                <button className="btn btn-warning btn-lg" style={{width:'200px'}}>Buy Now!</button>
            </div>
        </div>
        </div>
   )
}