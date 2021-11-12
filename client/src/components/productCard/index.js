import React from 'react';
import {BsFillCartPlusFill} from 'react-icons/bs'

export default function ProductCard({name, img, price, exists, id, oferta}){
    return(
        <div className='col'>
        <div className="card text-center" style={{width: '18rem'}}>
            <img src={img} className="card-img-top" alt="product"/>
            <div className="card-body">
                <p className="card-title"><strong>{name}</strong></p>
                <p className="card-text">
                    Precio: $ {price}
                   {/*  <br/>
                    Existe: {exists}
                    <br/>
                    Oferta: {oferta} */}
                </p>
                <button className="btn btn-warning btn-lg" style={{width:'200px'}}>Agregar <BsFillCartPlusFill/></button>
            </div>
        </div>
        </div>
   )
}