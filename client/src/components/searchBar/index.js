import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts, getAllProductsCat, sortCat, ASC } from "../../store/actions/products";
import { BiSearchAlt } from "react-icons/bi";
import './searchBar.css'

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const productos = useSelector(state => state.Product.auxProducts)


  const handleChange = (e) => {
    setQuery({
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.query === "") {
        await dispatch(getAllProductsCat()); 
        await dispatch(sortCat(ASC, productos))
    } else {
      await dispatch(searchProducts(query.query));
      // setQuery("");
    }
  };


  return (
    <section>
      <form className="d-flex barraBuscar" onSubmit={handleSubmit}>
        <input
          className="form-control me-2 searchinp"
          placeholder="Buscar..."
          aria-label="Search"
          type="search"
          name="query"
          onChange={handleChange}
          //onKeyDown={handleEnter}
        />
        <button
          type="submit"
          className="btn btn-outline-success searchbut"

/*           onClick={handleClick}
 */        >
          <BiSearchAlt />
        </button>
      </form>
    </section>
  );
}
