import React from "react";
import { useDispatch } from "react-redux";
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
  };

  return (
    <>
    <div className="col">
      <div className="card mt-3">
      <div className="product align-items-center text-center" /* style={{ width: "18rem" }} */>
        <img src={img} className="rounded anchoimg" alt={name} title={name} />
          <h6>
            {name}
          </h6>
          <div className="cost text-dark">
          <span>
           $ {price}
          </span>
          </div>
          <div
            className="p-3 buttonprod text-center text-white mt-3 cursor"
            onClick={() => {
              setToLocalStorage(prod);
            }}
          >
            <span className="text-uppercase">
             Agregar
            </span>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
