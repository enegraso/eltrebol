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
    <>
    <div className="col">
      <div className="card mt-3 shadow p-3 mb-5 bg-body rounded">
      <div className="product align-items-center p-2 text-center">
        <img src={img} className="rounded" width="160" alt={name} title={name} />
          <h5>
            {name}
          </h5>
          <div className="cost mt-3 text-dark">
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
