import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductCard from "../productCard";
import Spinner from "../spinner";
import { sortCat, ASC } from "../../store/actions/products";

export default function ProductGrid({ items, loading }) {
  const dispatch = useDispatch();

  const sortCategories = async (prod) => {
    await dispatch(sortCat(ASC, prod));
  };

  useEffect(() => {
   sortCategories(items);
  }, []);

  return loading ? (
    <Spinner />
  ) : (
    <section className="container">
      <div className="row justify-content-center">
        {" "}
        {/* lo quito para que haga equitativa la distribución: row-cols-md-4 row-cols-sm-1 */}
        {items.map((e) => (
          <ProductCard key={e.id}
            id={e.id}
            name={e.name}
            img={e.image}
            price={e.price}
            exist={e.exist}
            oferta={e.isOffert}
            prod={e}
          />
        ))}
      </div>
    </section>
  );
}
