import React from 'react';

export default function ProductCard({name, img, price, exists, id, oferta}){
    return(
        <div class='col'>
        <div class="card text-center" style={{width: '18rem'}}>
            <img src={img} class="card-img-top" alt="product"/>
            <div class="card-body">
                <p class="card-title"><strong>{name}</strong></p>
                <p class="card-text">
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