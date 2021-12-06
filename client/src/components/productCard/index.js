import React from "react";
import { useDispatch } from "react-redux";
import { BsFillCartPlusFill } from "react-icons/bs";
import saveToGuesCart from "../../store/actions/carrito";
import './productCard.css'

export default function ProductCard({
  name,
  img,
  price,
  exists,
  id,
  oferta,
  prod,
}) {
  const dispatch = useDispatch();

  const setToLocalStorage = (p) => {
    dispatch(saveToGuesCart(p));
    console.log("P",p)
  };

  return (
    <div className="col">
      <div className="card text-center" /* style={{ width: "18rem" }} */>
        <img src={img} className="card-img-top imageItem" alt={name} title={name} />
        <div className="card-body">
          <p className="card-title">
            <strong>{name}</strong>
          </p>
          <p className="card-text">
            Precio: $ {price}
            {/*  <br/>
                    Existe: {exists}
                    <br/>
                    Oferta: {oferta} */}
          </p>
          <button
            className="btn btn-warning btn-lg"
            style={{ width: "95%" }}
            onClick={() => {
              setToLocalStorage(prod);
            }}
          >
            Agregar <BsFillCartPlusFill />
          <span className='cartItem'></span>
          </button>
        </div>
      </div>
    </div>
  );
}
